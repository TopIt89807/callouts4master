import React, { Component } from 'react'
import { connect } from 'react-redux';
import Button from 'components/Button'
import defaultImg from 'static/images/default-thumbnail.jpg'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { NotificationManager } from 'react-notifications'
import { push, replace, goBack } from 'react-router-redux'

import { Creators } from 'redux/actions/user';
import { Types, Creators as postCreators } from 'redux/actions/post';
import { Creators as globalCreators } from 'redux/actions/global';
import ReactS3 from 'react-s3';
import { aws } from 'configs'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            imgSrc: defaultImg,
            thumbnailSrc: defaultImg,
        }
        this.onTextChange = this.onTextChange.bind(this)
    }

    componentDidMount() {
        if(this.props.location.state) {
            var {item} = this.props.location.state;
            this.setState({
                description: item.text,
                imgSrc: item.image? item.thumb_img: defaultImg,
                thumbnailSrc: item.image? item.thumb_img: defaultImg,
            });
        }
    }

    onTextChange(e) {
        this.setState({
          description: this.description.value
        })
    }

    componentWillReceiveProps({ global, user, follow, post }) {
        if (global.status.effects[Types.ADD_POST] === 'success'
            && this.props.global.status.effects[Types.ADD_POST] === 'request') {
            this.props.changeLocation(`/master`);
            this.props.getPosts(this.props.user.result.user.id);
        }
        if (global.status.effects[Types.UPDATE_POST] === 'success'
            && this.props.global.status.effects[Types.UPDATE_POST] === 'request') {
            this.props.backLocation();
            this.props.getPosts(this.props.user.result.user.id);
        }
    }

    previewFile() {
        var file = this.upload.files[0];
        var reader  = new FileReader();
        var preview = this.preview;
        var vm = this;

        reader.onloadend = function () {
            vm.setState({
                imgSrc: reader.result,
            })
            //Thumbnail Image must be resized to 50*50
            vm.setState({
                thumbnailSrc: reader.result,
            })
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = defaultImg;
        }
    }

    onBack() {
        this.props.changeLocation('/master');
    }

    onSave() {
        if(!this.state.description && this.state.imgSrc == defaultImg) {
            return NotificationManager.error(
                'Attach text or image!',
                'Error...'
              )
        }

        if(this.state.imgSrc == defaultImg) {
            if(this.props.location.state)
                this.props.updatePost(this.props.location.state.item._id, this.props.user.result.user.id, this.state.description, '', '');
            else
                this.props.addPost(this.props.user.result.user.id, this.state.description, '', '');


            return NotificationManager.success(
                'Success',
                'You posted a new text!',
            )
        }

        const file1 = {
            // `uri` can also be a file system path (i.e. file://)
            // uri: this.state.imgSrc,
            uri: "file:///Users/hamid/Downloads/tZNFwbug2M4.jpg",
            name: Date.now(),
            type: "image/jpeg"
        }

        const file2 = {
            // `uri` can also be a file system path (i.e. file://)
            uri: this.state.thumbnailSrc,
            name: Date.now() + "_",
            type: "image/png"
        }
            
        const options = {
            bucketName: aws.s3.bucketName,
            // albumName: "images",//aws.s3.keyPrefix,
            region: aws.region,
            accessKeyId: aws.s3.accessKey,
            secretAccessKey: aws.s3.secretKey,
        }

        ReactS3.upload(file1, options).then(response => {
            console.log(response);
            // ReactS3.upload(file2, options).then(response2 => {
            //     this.props.showMessage({
            //         visible: true,
            //         title: 'Success',
            //         text: 'New post added!',
                // })
                // if(params)
                //     this.props.updatePost(params._id, this.props.user.result.user.id, this.state.description,
                //         response.body.postResponse.location, response2.body.postResponse.location);
                // else
                    // this.props.addPost(this.props.user.result.user.id, this.state.description,
                    //     response, response2);
            // });
            /**
             * {
             *   postResponse: {
             *     bucket: "your-bucket",
             *     etag : "9f620878e06d28774406017480a59fd4",
             *     key: "uploads/image.png",
             *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
             *   }
             * }
             */
        })
        .catch((err) => console.log(err))

        
    }

    render() {
        return (
            <div className="activism-pages mb-5">
                <input id="myInput" type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }}  onChange={() => this.previewFile()} />
                <div className="page-block">
                    <div className="align-center">
                        <img ref={(ref) => this.preview = ref} className="page-image" src={this.state.thumbnailSrc} onClick={(e) => this.upload.click()}/>
                    </div>
                    <div className="page-description align-center mt-3">
                        <textarea ref={(ref) => this.description = ref} cols="50" rows="5" onChange={this.onTextChange} value={this.state.description}/>
                    </div>
                </div>
                <div className="inline-block">
                    <Button onClick={() => this.onBack()}>
                        Back
                    </Button>
                </div>
                <div className="float-right">
                    <Button onClick={() => this.onSave()}>
                        {!this.props.location.state && 'Save'}
                        {this.props.location.state && 'Update'}
                    </Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
      global: state.global,
      user: state.user,
      post: state.post,
  }
}

const mapDispatchToProps = {
  addPost: postCreators.addPost,
  updatePost: postCreators.updatePost,
  getPosts: postCreators.getPosts,
  signOut: Creators.signOut,
  showMessage: globalCreators.showMessage,
  replaceLocation: replace,
  changeLocation: push,
  backLocation: goBack,    
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
