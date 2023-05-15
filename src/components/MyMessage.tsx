interface IMyMessage {
  textMessage: string
}

const MyMessage = ({ textMessage }: IMyMessage) => {
  return (
    <li className="flex justify-end">
      <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
        <span className="block">{textMessage}</span>
      </div>
    </li>
  )
}

export default MyMessage
