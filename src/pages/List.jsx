import React, { useState } from 'react'
import { Card } from './Card'

export const List = ({ title, onUpdateListName }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [listTitle, setListTitle] = useState(title)

  const handleTitleClick = () => {
    setIsEditing(true)
  }

  const handleTitleBlur = () => {
    setIsEditing(false)
    onUpdateListName(listTitle)
  }

  const handleTitleChange = (e) => {
    setListTitle(e.target.value)
  }

  return (
    <div className='list'>
      {isEditing ? (
        <input type='text' value={listTitle} onChange={handleTitleChange} onBlur={handleTitleBlur} autoFocus />
      ) : (
        <h3 className='list__title' onClick={handleTitleClick}>
          {listTitle}
        </h3>
      )}

      <Card title={'aaaa 1'} />
    </div>
  )
}
