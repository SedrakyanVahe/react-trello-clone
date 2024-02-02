import { useState } from 'react'

export default function UsersList() {
  const [checked, setChecked] = useState([1])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <div className='users_list_wrapper'>
      <ul className='users_list'>
        <li className='users_list_item'>
          <div>
            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg' className='users_list_item_image' />
          </div>
          <div className='users_list_item_content'>
            <h4>Hitesh Kumar</h4>
            <p>@hk-skit</p>
          </div>
        </li>
        <li className='users_list_item'>
          <div>
            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg' className='users_list_item_image' />
          </div>
          <div className='users_list_item_content'>
            <h4>Vahe</h4>
            <p>@hk-skit</p>
            <p>@sssst</p>
          </div>
        </li>
      </ul>
    </div>
  )
}
