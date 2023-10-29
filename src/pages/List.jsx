import React, { useState } from 'react'
import { Card } from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { addCard, deleteListCards } from '../redux/cardsSlice'
import { deleteList } from '../redux/listsSlice'
import { Modal } from '../components/Modal'
import { threeDots } from '../assets/imagesAssets/globalImages'
import { Dropdown } from '../components/DropDown'

export const List = ({ listId, title, onUpdateListName }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [listTitle, setListTitle] = useState(title)
  const [isModalOpen, setModalOpen] = useState(false)
  const { cardsList } = useSelector((state) => state.cards)
  const cards = cardsList.filter((card) => card.listId === listId)
  const options = { Remove: 'deleteList', Edit: 'editList' }

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

  const handleAddCard = (cardTitle) => {
    dispatch(addCard({ id: Date.now(), listId: listId, title: cardTitle }))
  }

  const handleSelect = (option) => {
    const action = options[option]

    if (action && action === 'deleteList') {
      if (window.confirm('Are you sure you want to remove this list?')) {
        dispatch(deleteList(listId))
        dispatch(deleteListCards(listId))
      }
    }
  }

  return (
    <>
      <div className='list'>
        <div className='list_header'>
          {isEditing ? (
            <input type='text' value={listTitle} onChange={handleTitleChange} onBlur={handleTitleBlur} autoFocus />
          ) : (
            <h3 className='list_title' onClick={handleTitleClick}>
              {listTitle}
            </h3>
          )}

          <Dropdown img={threeDots} options={Object.keys(options)} onSelect={handleSelect} />
        </div>

        <ul className='list_items'>
          {cards.map((card) => (
            <Card key={card.id} listId={card.listId} cardId={card.id} title={card.title} description={card.description} />
          ))}
        </ul>

        <button className='add_card_btn' onClick={() => setModalOpen(true)}>
          Add a card
        </button>
        {isModalOpen && <Modal resource={'List'} onClose={() => setModalOpen(false)} onAddResource={handleAddCard} />}
      </div>
    </>
  )
}
