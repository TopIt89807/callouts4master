import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Moment from 'moment';
import Button from 'components/Button'
import { push, replace, goBack } from 'react-router-redux'

import { Types, Creators as postCreators } from 'redux/actions/post';

class Master extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps({ global, user, post }) {
        if (global.status.effects[Types.DELETE_POST] === 'success'
            && this.props.global.status.effects[Types.DELETE_POST] === 'request') {
            this.props.getPosts(this.props.user.result.user.id);
        }
    }

    componentDidMount() {
        this.props.getPosts(this.props.user.result.user.id);
    }

    onRemove(id) {
        this.props.deletePost(id);
    }

    onEdit(item) {
        this.props.changeLocation('/master/post', {item: item});
    }

    render() {
        if (this.props.user.result.status != 200) {
            return <Redirect to='/auth/login' />
        }

        var renderPosts = null
        if (this.props.post) {
            renderPosts = this.props.post.posts.map((ele, index) => {
                return (
                <div key={index} className="page-block">
                    {/* {ele._id} */}
                    <h5 className="mt-0 page-title">
                        {Moment(ele.created_date).format('YYYY/MM/DD H:mm:s')}
                        <Button className="float-right danger" onClick={() => this.onRemove(ele._id)}>
                            Remove
                        </Button>
                        <Button className="float-right" onClick={() => this.onEdit(ele)}>
                            Edit
                        </Button>
                    </h5>
                    
                    <div className="align-center">
                        {ele.image? 
                            <img className="page-image" src={ele.thumb_img}/>
                            : 'No Image'
                        }
                    </div>
                    <span className="page-description align-center">
                        {ele.text}
                    </span>
                </div>
                )
            })
        }

        return (
            <div className="activism-pages mb-5">
                {renderPosts}
            </div>
        );
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
    getPosts: postCreators.getPosts,
    deletePost: postCreators.deletePost,
    // signOut: Creators.signOut,
    replaceLocation: replace,
    changeLocation: push,
    backLocation: goBack,    
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Master)
