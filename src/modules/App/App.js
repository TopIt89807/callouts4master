import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { replace } from 'react-router-redux'
import { NotificationContainer } from 'react-notifications'

import asyncComponent from '../../components/AsyncComponent'
import Header from './components/Header'
const AsyncLogin = asyncComponent(() => import('../Authentication/Login'))
const AsyncSignUp = asyncComponent(() => import('../Authentication/Signup'))
const AsyncMaster = asyncComponent(() => import('../Master'))
const AsyncPost = asyncComponent(() => import('../Master/Post'))

class App extends Component {
    componentDidMount() {
    
        if (this.props.location.pathname === '/') {
            this.props.replaceLocation("/auth/login");
        }
    
    }

    render() {
        return (
            <div>
                <Header/>
                <main className="main-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10" /*style={{ background: 'gray' }}*/>
                                <Switch>
                                    <Route exact path="/auth/login" component={ AsyncLogin } />
                                    <Route exact path="/auth/signup" component={ AsyncSignUp } />
                                    {this.props.user.result.status != 200 && <Redirect to='/auth/login' />}
                                    <Route exact path="/master" component={ AsyncMaster } />
                                    <Route exact path="/master/post" component={ AsyncPost } />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </main>
                <NotificationContainer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
      replaceLocation: path => dispatch(replace(path)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(App)
  