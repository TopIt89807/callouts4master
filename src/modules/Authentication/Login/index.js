import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push, replace, goBack } from 'react-router-redux'

import { Types, Creators } from '../../../redux/actions/user';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
          email: '',
          password: '',
        }
    
        this.onChange = this.onChange.bind(this)
        this.onEmail = this.onEmail.bind(this)
    }
    onChange(e) {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
    
        this.setState({
          [name]: value
        })
    }
    onEmail(e) {
        const value = e.target.value
        const name = e.target.name

        this.setState({
          [name]: value.toLowerCase()
        })
    }
    onLogin(e) {
        e.preventDefault()
        const { email, password } = this.state
        this.props.signIn(email, password);
    }

    componentWillReceiveProps({ global, user }) {
      if (global.status.effects[Types.SIGN_IN] === 'success'
          && this.props.global.status.effects[Types.SIGN_IN] === 'request') {
          this.props.changeLocation(`/master`)
      }
    }

    render() {
        return (
          <div className="row py-4 py-md-5 my-md-5">
            <div className="px-4 py-4 mx-auto">
              <form className="form-horizontal" onSubmit={ this.onLogin.bind(this) }>
                <div className="row">
                  <div className="col-12">
                      <div className="form-group">
                          <label htmlFor="email" className="ml-2">Email :</label>
                          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                              <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-at"></i></div>
                              <input type="text" name="email" className="form-control" id="email"
                                     placeholder="Email" required autoFocus value={ this.state.email } onChange={ this.onEmail } />
                          </div>
                      </div>
                  </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="password" className="ml-2">Password :</label>
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-key"></i></div>
                                <input type="password" name="password" className="form-control" id="password"
                                       placeholder="Password" required value={ this.state.password } onChange={ this.onChange } />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-12">
                    <button type="submit" className="btn btn-success col">
                      <div><i className="fa fa-sign-in"></i> Login</div>
                    </button>
                  </div>
    
                  <div className="col">
                    <div className="form-check mt-3 mb-2 mr-sm-2 mb-sm-0 text-center">
                      <Link to="/auth/signup">No Account? &nbsp;Register</Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )
    }
}

const mapStateToProps = store => {
    return {
      global: store.global,
      user: store.user
    }
}
  
  // Retrieve dispatch and callbacks from store as props
const mapDispatchToProps = {  
      signIn: Creators.signIn,
      replaceLocation: replace,
      changeLocation: push,
      backLocation: goBack,    
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
  