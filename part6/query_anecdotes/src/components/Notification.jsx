const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if(!props.text) return null

  return (
    <div style={style}>
      {props.text}
    </div>
  )
}

export default Notification
