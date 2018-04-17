import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { replace } from 'react-router-redux'
import { NotificationContainer } from 'react-notifications'

import asyncComponent from '../../components/AsyncComponent'
import Header from './components/Header'
const AsyncLogin = asyncComponent(() => import('../Authentication/Login'))
const AsyncSignUp = asyncComponent(() => import('../Authentication/Signup'))

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
                            {/* <div className="col-md-2"></div> */}
                            <div className="col-md-12" /*style={{ background: 'gray' }}*/>
                                <Switch>
                                    <Route exact path="/auth/login" component={ AsyncLogin } />
                                    <Route exact path="/auth/signup" component={ AsyncSignUp } />
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
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
      replaceLocation: path => dispatch(replace(path)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(App)
  