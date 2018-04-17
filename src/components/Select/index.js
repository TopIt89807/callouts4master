import React, { Component } from 'react'

import Select from 'antd/lib/select'
import './styles.css'

class SelectComponent extends Component {
  render() {
    return (
      <Select
        showSearch
        className="w-100"
        style={{ fontSize: '16px' }}
        placeholder=""
        value={ this.props.value }
        onChange={ this.props.onChange }
        notFoundContent='Not Found'
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        disabled={ this.props.disabled }
      >
        { this.props.children }
      </Select>
    )
  }
}

SelectComponent.Option = Select.Option

export default SelectComponent
