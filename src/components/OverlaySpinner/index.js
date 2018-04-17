import React from 'react'
import { Circle } from 'better-react-spinkit'
import cn from 'classname'
import './styles.css'

const OverlaySpinner = ({ visible, size, color, text, absolute }) => {
  return (
    <div className={cn('overlay', { 'overlay--hidden': !visible }, { 'overlay--absolute': absolute })}>
      <Circle size={size} color={color} />
      <div className="overlay__text mt-1" style={{ color: color }}>{ text }</div>
    </div>
  )
}

OverlaySpinner.defaultProps = {
  size: 64,
  color: '#91d5ff',
  text: '',
  absolute: false,
}

export default OverlaySpinner