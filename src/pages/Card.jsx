import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { transformObject } from '../helpers/helpers'
import { updateCard } from '../redux/cardsSlice'
import { getCurrentBoardUsers } from '../redux/usersSlice'
import { CardModal } from '../components/CardModal'

export const Card = ({ cardId, listId, title, description }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [isCardModalOpen, setCardModalOpen] = useState(false)
  const lists = useSelector((state) => state.lists.currentBoardLists)
  const users = useSelector((state) => state.users.currentBoardUsers)
  const listsObject = transformObject(lists, 'lists')

  const handleUpdateCard = (cardTitle, cardDesc, cardListId) => {
    dispatch(updateCard({ id: cardId, listId: cardListId, title: cardTitle, description: cardDesc }))
  }

  useEffect(() => {
    dispatch(getCurrentBoardUsers(id))
  }, [dispatch, id])

  const cardMembers = users.filter((user) => user.cardId == cardId)

  return (
    <>
      <li onClick={() => setCardModalOpen(true)} className='list_item'>
        <span className='card_tag card_tag_browser'>Browser</span>
        <h6 className='card_title'>{title}</h6>
        <ol className='card_actions'>
          <ol className='card_avatars'>
            {cardMembers.map((member) => (
              <li key={member.id} className='card_avatars_item'>
                <img src={member.avatar} alt='avatar' className='avatar_image' />
              </li>
            ))}
          </ol>
        </ol>
      </li>

      {isCardModalOpen && (
        <CardModal
          title={title}
          description={description}
          listId={listId}
          lists={listsObject}
          cardMembers={cardMembers}
          onClose={() => setCardModalOpen(false)}
          handleUpdateCard={handleUpdateCard}
        />
      )}
    </>
  )
}
