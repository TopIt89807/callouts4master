import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { push, replace, goBack } from 'react-router-redux'

import './styles.css'

class Header extends Component {
    constructor(props) {
        super(props)
        this.addPost = this.addPost.bind(this)
    }
    
    isLogged() {
        return this.props.user.result.status == 200
    }

    addPost() {
        this.props.replaceLocation(`/master/post`)
    }
    
    render() {
        return (
            <header className="app-header navbar">
                <ul className="nav navbar-nav hidden-md-down">
                    <li className="nav-item">
                        <a className="nav-link navbar-toggler sidebar-toggler" onClick={ this.sidebarToggle } href="">&#9776;</a>
                    </li>
                </ul>
                <a className="navbar-brand" href="/">
                    <div className="d-flex h-100 flex-column justify-content-center align-items-center">
                        <strong>Callouts - Masters</strong>
                    </div>
                </a>

                <ul className="nav navbar-nav ml-auto">
                    {this.isLogged() && (<li className="nav-item">
                      <a onClick={this.addPost} className="nav-link navbar-toggler sidebar-toggler mr-3"> Add </a>
                    </li>)}
                    {this.isLogged() && (<li className="nav-item">
                      <a className="nav-link navbar-toggler sidebar-toggler" href=""> Logout </a>
                    </li>)}
                </ul>
            </header>  
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // global: state.global,
        user: state.user,
        // follow: state.follow,
        // post: state.post,
    }
  }
  
const mapDispatchToProps = {
    replaceLocation: replace,
    // getPosts: postCreators.getPosts,
    // getFollowings: followCreators.getFollowings,
    // deletePost: postCreators.deletePost,
    // signOut: Creators.signOut,
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Header)
