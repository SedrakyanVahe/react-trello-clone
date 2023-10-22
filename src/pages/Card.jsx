import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { avatarImage } from '../assets/imagesAssets/globalImages'
import { CardModal } from '../components/CardModal'
import { updateCard } from '../redux/cardsSlice'

export const Card = ({ cardId, listId, title, description }) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false)
  const dispatch = useDispatch()

  const handleUpdateCard = (cardTitle, cardDesc) => {
    dispatch(updateCard({ id: cardId, listId: listId, title: cardTitle, description: cardDesc }))
  }

  return (
    <>
      <li onClick={() => setCardModalOpen(true)} className='list__item'>
        <span className='card__tag card__tag--browser'>Browser</span>
        <h6 className='card__title'>{title}</h6>
        <ol className='card__actions'>
          <ol className='card__avatars'>
            <li className='card__avatars--item'>
              <img src={avatarImage} alt='avatar' className='avatar__image' />
            </li>
          </ol>
        </ol>
      </li>

      {isCardModalOpen && <CardModal title={title} description={description} onClose={() => setCardModalOpen(false)} onUpdateCard={handleUpdateCard} />}
    </>
  )
}
