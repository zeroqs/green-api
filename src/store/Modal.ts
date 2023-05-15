import { create } from 'zustand'

interface ModalState {
  isModal: boolean
  showModal: (isOpen: boolean) => void
  closeModal: (isOpen: boolean) => void
}

export const useModalStore = create<ModalState>((set) => ({
  isModal: false,
  showModal: (setOpen: boolean) => set(() => ({ isModal: setOpen })),
  closeModal: (setClose: boolean) => set(() => ({ isModal: setClose })),
}))
