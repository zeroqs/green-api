import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface IUserStore {
  idInstance: string
  apiTokenInstance: string
  setUserId: (id: string) => void
  setApiToken: (token: string) => void
}

export const useUserSelfStore = create<IUserStore>()(
  devtools(
    persist(
      (set) => ({
        idInstance: '',
        apiTokenInstance: '',
        setUserId: (id: string) => set(() => ({ idInstance: id })),
        setApiToken: (token: string) =>
          set(() => ({ apiTokenInstance: token })),
      }),
      {
        name: 'user-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
)
