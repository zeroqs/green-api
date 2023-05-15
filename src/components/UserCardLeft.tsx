import { useNavigate } from 'react-router-dom'

interface IUserCardLeft {
  id: string
  avatar: string
  name: string
  phone: string
  phoneFormatted: string
}

const UserCardLeft = ({
  id,
  avatar,
  name,
  phone,
  phoneFormatted,
}: IUserCardLeft) => {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(`/contacts/${id}`)}>
      <div className="card pl-4 flex flex-col">
        <div className="flex items-center gap-3">
          <img className="rounded-full w-10" src={avatar} alt={name} />
          <h1 className="font-medium antialiased text-left text-lg">{name}</h1>
        </div>
        <span className="text-xs text-left">
          Phone : {phoneFormatted ? phoneFormatted : phone}
        </span>
      </div>
    </button>
  )
}

export default UserCardLeft
