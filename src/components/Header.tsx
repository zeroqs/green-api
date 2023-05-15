import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useModalStore } from '../store/Modal'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const showModal = useModalStore((state) => state.showModal)

  const exit = () => {
    localStorage.removeItem('user-storage')
    navigate('/login')
  }
  return (
    <header className="flex justify-center justify-items-center gap-20	">
      <>
        <button
          className="bg-red-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
          onClick={() => exit()}
        >
          Выход
        </button>
        <button onClick={() => navigate('/')}>
          <h1 className="font-medium text-xl ">Messenger</h1>
        </button>
        <button onClick={() => showModal(true)}>
          <FontAwesomeIcon
            className="hover:pointer"
            icon={faPlus}
            style={{ color: '#2166de' }}
            size="xl"
          />
        </button>
      </>
    </header>
  )
}

export default Header
