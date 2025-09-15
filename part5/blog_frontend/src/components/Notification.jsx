const Notification = ({ notification, isError }) => {
  return (
    <div className="notification">
      {isError ? <h2>Oppsi! 🫢</h2> : <h2>New Blog! 📝</h2>}
      {notification}
    </div>
  )
}

export default Notification
