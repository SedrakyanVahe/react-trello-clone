import UsersList from './UsersList'

export const AddUsersModal = ({ onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <form>
      <div className='modal_overlay' onClick={handleOverlayClick}>
        <div className='modal users_modal'>
          <div className='modal_header'>
            <h2>Users</h2>
            <button className='close_button' onClick={onClose}>
              &times;
            </button>
          </div>
          <div className='modal_content'>
            <UsersList />
          </div>
        </div>
      </div>
    </form>
  )
}
