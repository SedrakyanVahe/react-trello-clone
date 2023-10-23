import React, { useState } from 'react'
import { Card } from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { addCard } from '../redux/cardsSlice'
import { Modal } from '../components/Modal'

export const List = ({ listId, title, onUpdateListName }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [listTitle, setListTitle] = useState(title)
  const [isModalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

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

  const { cardsList } = useSelector((state) => state.cards)
  const cards = cardsList.filter((card) => card.listId == listId)

  const handleAddCard = (cardTitle) => {
    dispatch(addCard({ id: Date.now(), listId: listId, title: cardTitle }))
  }

  return (
    <>
      <div className='list'>
        {isEditing ? (
          <input type='text' value={listTitle} onChange={handleTitleChange} onBlur={handleTitleBlur} autoFocus />
        ) : (
          <h3 className='list_title' onClick={handleTitleClick}>
            {listTitle}
          </h3>
        )}

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
