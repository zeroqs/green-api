import { createBrowserRouter } from 'react-router-dom'
import Chat from '../pages/Chat'
import ErrorPage from '../pages/ErrorPage'
import LogIn from '../components/LogIn'
import Contact from './Contacts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />,
      },
    ],
  },
  {
    path: '/login',
    element: <LogIn />,
    errorElement: <ErrorPage />,
  },
])
