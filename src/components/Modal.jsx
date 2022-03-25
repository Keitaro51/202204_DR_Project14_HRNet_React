import '../style/modal.css'

const Modal = ({ updateDisplay }) => {
  const handleClose = (e) => {
    const ignore = document.getElementsByClassName('ignore')[0]
    if (e.target === ignore) {
      return
    } else {
      updateDisplay(false)
    }
  }

  return (
    <div className="modal-wrapper" onClick={handleClose}>
      <div id="confirmation" className="modal ignore">
        Employee Created!
        <div className="modal-close">X</div>
      </div>
    </div>
  )
}

export default Modal
