import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationStyle = {
    backgroundColor: "#babec4ff",
    color: "white",
    borderRadius: "20px",
    margin: "10px",
    padding: "20px"
  }

  const notification = useSelector(state => state.notification)

  return (
    <div style={notificationStyle}>
      {!notification
        ? 'Show notification'
        : notification
      }
    </div>
  )
}

export default Notification
