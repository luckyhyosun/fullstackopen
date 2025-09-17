import { useState, useImperativeHandle } from "react";

const Togglable = props => {
  const [visible, setVisible] = useState(false);

  const hideBlock = { display: visible ? 'none' : '' }
  const showBlock = { display: visible ? '' : 'none' }

  const handleToggle = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { handleToggle }
  })

  return(
    <div>
      <div style={hideBlock}>
        <button onClick={handleToggle}>{props.buttonLabel}</button>
      </div>
      <div style={showBlock}>
        <button onClick={handleToggle}>Cancle</button>
        {props.children}
      </div>
    </div>

  )
}

export default Togglable
