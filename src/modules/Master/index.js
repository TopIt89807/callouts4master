import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Moment from 'moment';

import { Types, Creators as postCreators } from 'redux/actions/post';

class Master extends Component {
    componentDidMount() {
        this.props.getPosts(this.props.user.result.user.id);
    }

    render() {
        if (this.props.user.result.status != 200) {
            return <Redirect to='/auth/login' />
        }

        console.log(this.props.post.posts);
        var renderPosts = null
        if (this.props.post) {
            renderPosts = this.props.post.posts.map((ele, index) => {
                return (
                <div key={index} className="page-block">
                    {/* {ele._id} */}
                    <h5 className="mt-0 page-title">{Moment(ele.created_date).format('YYYY/MM/DD H:mm:s')}</h5>
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
        // follow: state.follow,
        post: state.post,
    }
  }
  
const mapDispatchToProps = {
    getPosts: postCreators.getPosts,
    // getFollowings: followCreators.getFollowings,
    // deletePost: postCreators.deletePost,
    // signOut: Creators.signOut,
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Master)
