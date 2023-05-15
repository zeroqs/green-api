import { useModalStore } from '../store/Modal'
import React, { useEffect } from 'react'
import { phone } from '../utils/phone'
import { addUser } from '../api/axios'
import { useUsersStore } from '../store/Users'

const Modal = () => {
  const isModal = useModalStore((state) => state.isModal)
  const closeModal = useModalStore((state) => state.closeModal)
  const refreshUsers = useUsersStore((state) => state.fetchUsers)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [phoneNumberFormatted, setPhoneNumberFormatted] = React.useState('')

  const setPhone = (event: React.FormEvent<HTMLInputElement>) => {
    setPhoneNumber(
      event.currentTarget.value
        .replace(/[^A-Za-z0-9\s!?]/g, '')
        .replace(/\s/g, '')
    )
    setPhoneNumberFormatted(event.currentTarget.value)
  }
  const escapeModal = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      closeModal(false)
    }
  }
  const closeOverlay = (e: MouseEvent) => {
    const target = e.target as Element
    if (target.id === 'overlay') {
      e.preventDefault()
      closeModal(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', escapeModal)
    document.addEventListener('click', closeOverlay)
    return () => {
      document.removeEventListener('keydown', escapeModal)
      document.removeEventListener('click', closeOverlay)
    }
  }, [])

  useEffect(() => {
    const phoneInputs = document.querySelectorAll('input[data-tel-input]')
    if (phoneInputs.length > 0) {
      phone(phoneInputs)
    }
  }, [isModal])

  if (!isModal) return null

  const isCorrectPhone = (): boolean => {
    if (
      inputRef.current &&
      inputRef.current.value &&
      inputRef?.current?.value.length >= 11
    ) {
      closeModal(false)
      return true
    } else {
      alert('Введите телефон')
      return false
    }
  }
  const startChat = () => {
    if (isCorrectPhone()) {
      addUser(phoneNumber, phoneNumberFormatted).then(() => refreshUsers())
    }
  }
  return (
    <section
      id="overlay"
      className="bg-black bg-opacity-50 backdrop-blur-sm fixed inset-0 flex items-center justify-center"
    >
      <div className="bg-white w-96 p-5 rounded">
        <h1 className="font-bold text-2xl text-cyan-500">
          Введите номер телефона получателя
        </h1>
        <input
          onInput={(event) => setPhone(event)}
          ref={inputRef}
          data-tel-input
          maxLength={18}
          placeholder="+7 (555) 555-55-55"
          type="tel"
          className="w-full border border-gray-600 p-1 mt-2 rounded "
        />
        <button
          onClick={startChat}
          className="mt-2 py-2 px-5 bg-cyan-600 text-white rounded"
        >
          Начать чат
        </button>
      </div>
    </section>
  )
}

export default Modal
