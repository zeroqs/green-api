import { useUserSelfStore } from '../store/UserSelf'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
  const setUserId = useUserSelfStore((state) => state.setUserId)
  const setApiToken = useUserSelfStore((state) => state.setApiToken)
  const [id, setId] = useState('')
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  const handlerId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value)
  }
  const handlerToken = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.currentTarget.value)
  }
  const setUser = () => {
    if (id && token) {
      setUserId(id)
      setApiToken(token)
      navigate('/')
    } else {
      alert('Введите данные')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              idInstance
            </label>
            <input
              value={id}
              onChange={handlerId}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              apiTokenInstance
            </label>
            <input
              value={token}
              onChange={handlerToken}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <button
              onClick={setUser}
              type="button"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Войти</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn
