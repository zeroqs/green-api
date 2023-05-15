import { useUserStore } from '../store/User'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchOneUser, receiveNotification } from '../api/axios'
import OtherMessage from './OtherMessage'

const Messages = () => {
  const user = useUserStore((state) => state.user)
  const fetchUser = useUserStore((state) => state.fetchUser)
  const [messages, setMessages] = useState<any[]>([])
  const { contactId } = useParams()

  useEffect(() => {
    if (contactId) {
      fetchUser(contactId)
    }
    setMessages([])
  }, [contactId])

  const refresh = async () => {
    if (contactId) {
      const user = await fetchOneUser(contactId)
      const notifications = await receiveNotification()
      const userPhoneFormatted = `${user.phone}@c.us`
      if (notifications) {
        const filteredNotifications = notifications.filter(
          (item) => item.chatId === userPhoneFormatted
        )
        console.log(notifications)
        if (filteredNotifications) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setMessages((prevState) => [...prevState, ...filteredNotifications])
        }
      }
    }
  }

  return (
    <>
      <div className="hidden lg:col-span-2 lg:block">
        <div className="flex items-center gap-4">
          <img
            className="rounded-full w-10"
            src={user.avatar}
            alt={user.name}
          />
          <h1 className="font-medium text-xl">{user.name}</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
            onClick={refresh}
          >
            Нажмите чтобы обновить чат
          </button>
        </div>
        <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
          <ul className="space-y-2">
            {messages.map((item, index) => (
              <OtherMessage key={index} textMessage={item.textMessage} />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Messages
