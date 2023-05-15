import { create } from 'zustand'
import { fetchUsers } from '../api/axios'
import { devtools } from 'zustand/middleware'

export interface IUser {
  createdAt: string
  name: string
  avatar: string
  id: string
  phone: string
  phoneFormatted: string
}

interface IUsersStore {
  users: IUser[]
  fetchUsers: () => void
}

export const useUsersStore = create<IUsersStore>()(
  devtools((set) => ({
    users: [],
    fetchUsers: async () => {
      const users: IUser[] = await fetchUsers()
      await set({ users })
    },
  }))
)
