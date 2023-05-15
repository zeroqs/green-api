import { useUsersStore } from '../store/Users'
import { useEffect } from 'react'
import UserCardLeft from './UserCardLeft'

const UserLeftChat = () => {
  const fetchUsers = useUsersStore((state) => state.fetchUsers)
  const users = useUsersStore((state) => state.users)
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <section className="pt-5 h-screen flex flex-col gap-6">
      {users.map((item) => (
        <UserCardLeft key={item.id} {...item} />
      ))}
    </section>
  )
}

export default UserLeftChat
