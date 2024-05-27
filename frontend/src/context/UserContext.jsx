/* eslint-disable no-unused-vars */
import {createContext, useContext, useState} from "react";
// import UserApi from "../services/Api/UserApi.js";
// import { axiosClient } from "../api/axios.js";
import UserApi from "../services/api/UserApi";

export const UserStateContext = createContext({
  user: {},
  authenticated: false,
  setUser: () => { },
  logout: () => { },
  login: (email, password) => { },
  register: (name,email,password) =>{},
  setAuthenticated: () => { },
  setToken: () => { },
})
// eslint-disable-next-line react/prop-types
export default function UserContext({children}) {
  const [user, setUser] = useState({name: 'test'})
  const [authenticated, _setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'))

  const login = async (email, password) => {
    await UserApi.getCsrf()
    return UserApi.login(email, password)
  }
  const logout = () => {
    setUser({})
    setAuthenticated(false)
  }
  const register = async (name,email,password)=>{
    await UserApi.register(name,email,password,password)
  }

  const setAuthenticated = (isAuthenticated) => {
    _setAuthenticated(isAuthenticated)
    window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
  }

  const setToken = (token) => {
    window.localStorage.setItem('token', token)
  }

  return <>
    <UserStateContext.Provider value={{
      user,
      login,
      logout,
      register,
      setUser,
      authenticated,
      setAuthenticated,
      setToken
    }}>
      {children}
    </UserStateContext.Provider>
  </>
}
export const useUserContext = () => useContext(UserStateContext)