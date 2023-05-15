import axios from 'axios'
import { IUser } from '../store/Users'

export const instance = axios.create({
  baseURL: 'https://643439a81c5ed06c9592599b.mockapi.io',
})

export const greenApiInstance = axios.create({
  baseURL: 'https://api.green-api.com',
})

export const fetchUsers = async (): Promise<IUser[]> => {
  const res = await instance.get('/users')
  return res.data
}

export const fetchOneUser = async (id: string): Promise<IUser> => {
  const res = await instance.get(`/users/${id}`)
  return res.data
}

export const addUser = async (phone: string, phoneFormatted: string) => {
  const res = await instance.post('/users', {
    phone,
    phoneFormatted,
  })
  return res.data
}

export const sendText = async (phone: string, message: string) => {
  const user = JSON.parse(localStorage.getItem('user-storage') || '{}')
  const idInstance = user.state.idInstance
  const apiTokenInstance = user.state.apiTokenInstance
  const res = await greenApiInstance.post(
    `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      chatId: `${phone}@c.us`,
      message,
    }
  )
  return res.data
}
export const receiveNotification = async () => {
  const objects = []
  const user = JSON.parse(localStorage.getItem('user-storage') || '{}')
  const idInstance = user.state.idInstance
  const apiTokenInstance = user.state.apiTokenInstance
  let res
  try {
    while (
      (res = await greenApiInstance.get(
        `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
      ))
    ) {
      const {
        receiptId,
        body: {
          typeWebhook,
          messageData: {
            textMessageData: { textMessage },
          },
          senderData: { chatId },
        },
      } = res.data
      if (typeWebhook === 'incomingMessageReceived') {
        const object = { chatId, receiptId, textMessage }
        objects.push(object)
        console.log(object)
        await deleteNotification(receiptId)
      } else {
        console.log(receiptId)
        await deleteNotification(receiptId)
      }
    }
  } catch (e) {
    if (res && res.data) {
      if (res.data.body.typeWebhook !== 'incomingMessageReceived') {
        console.log(res.data.body.typeWebhook)
        await deleteNotification(res.data.receiptId)
      }
    }

    return objects
  }
}
export const deleteNotification = async (id: string) => {
  const user = JSON.parse(localStorage.getItem('user-storage') || '{}')
  const idInstance = user.state.idInstance
  const apiTokenInstance = user.state.apiTokenInstance
  const res = await greenApiInstance.delete(
    `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${id}`
  )
  return res.data
}
