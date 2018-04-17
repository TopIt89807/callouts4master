import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Components
import { Modal, ModalBody } from 'reactstrap'

import Button from '../Button'

const btnStyle = { width: '100%' }

class InputDialog2 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value1: props.value2 || '',
      value2: props.value2 || ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount() {
    this.setState({ content: this.props.defaultValue ? this.props.defaultValue : '' })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen && nextProps.isOpen) {
      this.setState({ value1: nextProps.value1 || '', value2: nextProps.value2 || '' })
    }
  }

  onChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  onSave(e) {
    e.preventDefault()
    this.props.save(this.state.value1, this.state.value2)
    this.props.toggle()
  }

  render() {
    return (
      <Modal isOpen={ this.props.isOpen } toggle={ this.props.toggle } className={ this.props.className } >
        <ModalBody>
          <div className="dialog-header">
            { this.props.title }
            <i className="fa fa-times float-right close-button" onClick={ this.props.toggle  }></i>
          </div>
          <form onSubmit={ this.onSave }>
            <div className="dialog-body pb-0">
              <div className="form-group">
                <label className="ml-2" htmlFor="value1" style={{ fontSize: '1.1em' }}>{ this.props.label1 }</label>
                <input className="form-control" type={ this.props.type1 } name="value1" id="value1" value={ this.state.value1 } onChange={ this.onChange } required/>
              </div>
              <div className="form-group">
                <label className="ml-2" htmlFor="value2" style={{ fontSize: '1.1em' }}>{ this.props.label2 }</label>
                <input className="form-control" type={ this.props.type2 } name="value2" id="value2" value={ this.state.value2 } onChange={ this.onChange } required/>
              </div>
            </div>
            <div className="dialog-footer">
              <Button style={ btnStyle }>
                { this.props.buttonTitle }
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    )
  }
}

InputDialog2.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  label1: PropTypes.string,
  type1: PropTypes.string,
  value1: PropTypes.string,
  label2: PropTypes.string,
  type2: PropTypes.string,
  value2: PropTypes.string,

  buttonTitle: PropTypes.string.isRequired,

  toggle: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
}

export default InputDialog2
