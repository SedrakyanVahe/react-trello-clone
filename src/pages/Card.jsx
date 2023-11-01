import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { transformObject } from '../helpers/helpers'
import { avatarImage } from '../assets/imagesAssets/globalImages'
import { CardModal } from '../components/CardModal'
import { updateCard } from '../redux/cardsSlice'

export const Card = ({ cardId, listId, title, description }) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false)
  const dispatch = useDispatch()
  const lists = useSelector((state) => state.lists.currentBoardLists)
  const listsObject = transformObject(lists, 'lists')

  const handleUpdateCard = (cardTitle, cardDesc, cardListId) => {
    dispatch(updateCard({ id: cardId, listId: cardListId, title: cardTitle, description: cardDesc }))
  }

  return (
    <>
      <li onClick={() => setCardModalOpen(true)} className='list_item'>
        <span className='card_tag card_tag_browser'>Browser</span>
        <h6 className='card_title'>{title}</h6>
        <ol className='card_actions'>
          <ol className='card_avatars'>
            <li className='card_avatars_item'>
              <img src={avatarImage} alt='avatar' className='avatar_image' />
            </li>
          </ol>
        </ol>
      </li>

      {isCardModalOpen && (
        <CardModal
          title={title}
          description={description}
          listId={listId}
          lists={listsObject}
          onClose={() => setCardModalOpen(false)}
          handleUpdateCard={handleUpdateCard}
        />
      )}
    </>
  )
}
