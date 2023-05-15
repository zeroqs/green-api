interface IOtherMessage {
  textMessage: string
}

const OtherMessage = ({ textMessage }: IOtherMessage) => {
  return (
    <li className="flex justify-start">
      <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
        <span className="block">{textMessage}</span>
      </div>
    </li>
  )
}

export default OtherMessage
