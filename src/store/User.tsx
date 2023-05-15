import { create } from 'zustand'
import { fetchOneUser } from '../api/axios'
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
  user: IUser
  fetchUser: (id: string) => void
}

export const useUserStore = create<IUsersStore>()(
  devtools((set) => ({
    user: {
      createdAt: '',
      name: '',
      avatar: '',
      id: '',
      phone: '',
      phoneFormatted: '',
    },
    fetchUser: async (id: string) => {
      const user: IUser = await fetchOneUser(id)
      await set({ user })
    },
  }))
)
