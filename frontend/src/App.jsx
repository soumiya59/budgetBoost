import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router'
import UserContext from './context/UserContext'

function App() {

  return (
    <div>
        <UserContext>
          <RouterProvider router={router}/>
        </UserContext>
    </div>
  )
}

export default App
