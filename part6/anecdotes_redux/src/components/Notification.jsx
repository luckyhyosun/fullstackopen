import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()

  const show = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20
  }

  const hidden = {
    display: 'none'
  }

  let notificationText = useSelector(state => state.notification)
  setTimeout(() => {
    dispatch(createNotification(''))
  },5000)

  return (
    <div style={notificationText ? show : hidden}>
      {notificationText}
    </div>
  )
}

export default Notification
