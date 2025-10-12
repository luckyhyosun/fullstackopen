import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)

  const style = {
    padding: 2,
    backgroundColor: "lightblue"
  }

  return <p style={style}>{message}</p>
}

export default Notification
