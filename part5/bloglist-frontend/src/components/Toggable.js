import React from 'react'
import { useState } from 'react'

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  let buttonVisible = { display: visible ? 'none' : '' }
  let contentVisible = { display: visible ? '' : 'none' }

  return (
    <>
      <div style={buttonVisible}>
        <button onClick={() => setVisible(true)}>{props.buttonLabel}</button>
      </div>
      <div style={contentVisible}>
        {props.children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </>
  )
}

export default Toggable