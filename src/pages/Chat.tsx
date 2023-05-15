import LeftSide from '../components/LeftSide'
import Modal from '../components/Modal'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Chat = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user-storage') || '{}')
    if (!(user.state.apiTokenInstance && user.state.idInstance)) {
      navigate('/login')
    }
  }, [])

  return (
    <main className="flex gap-10">
      <LeftSide />
      <Outlet />
      <Modal />
    </main>
  )
}

export default Chat
