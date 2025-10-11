const Notification = ({ message }) => {
  const style = {
    padding: 2,
    backgroundColor: "lightblue"
  }

  return <p style={style}>{message}</p>
}

export default Notification
