import { useSelector } from "react-redux"

const Notification = () => {
  const show = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20
  }

  const hidden = {
    display: 'none'
  }

  let notificationText = useSelector(state => {
    console.log(state);
    return state.notification
  })

  return (
    <div style={notificationText ? show : hidden}>
      {notificationText}
    </div>
  )
}

export default Notification
