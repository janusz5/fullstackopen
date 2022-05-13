import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification == null) return (<></>)
  else return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => ({notification: state.notification})

export default connect(mapStateToProps)(Notification)