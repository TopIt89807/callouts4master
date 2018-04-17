import React from 'react'

import NumberFormat from 'react-number-format'

const PhoneInput = ({ name, value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.value)
  }

  return (
    <div className="form-group row">
    <label htmlFor={name} className="col-auto col-md-3 col-form-label text-right">Phone:</label>
    <div className="ml-auto col-md-9 d-flex flex-row">
      <input
        type="tel"
        className="form-control col-2"
        id="country_code"
        placeholder="+1"
        required
        readOnly
      />
      
      <NumberFormat className="form-control" value={value} displayType={'input'} format="(###)-###-####" onValueChange={handleChange} />
    </div>
  </div>
  )
}

PhoneInput.defaultProps = {
  name: 'phone',
}

export default PhoneInput
