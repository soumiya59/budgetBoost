import {createContext, useContext, useState} from "react";
// import AccountApi from "../services/Api/AccountApi.js";
// import { axiosClient } from "../api/axios.js";
import AccountApi from "../services/api/AccountApi";

export const AccountStateContext = createContext({
  addAccount: () => { },
  getAccounts: () => { },
  getAccount: () => { },
  setAccounts: () => { }
})
// eslint-disable-next-line react/prop-types
export default function AccountContext({children}) {
  const [accounts, setAccounts] = useState([])

  const addAccount = async (name, balance, currency) => {
    return AccountApi.addAccount(name,balance, currency)
  }
  const getAccounts = async () => {
    const data = await AccountApi.getAccounts()
    return data
  }
  const getAccount = async (id) => {
    const data = await AccountApi.getAccount(id)
    return data
  }
  // setAccounts(getAccounts())



  return <>
    <AccountStateContext.Provider value={{
      addAccount,
      getAccounts,
      getAccount,
      accounts,
      setAccounts
    }}>
      {children}
    </AccountStateContext.Provider>
  </>
}
export const useAccountContext = () => useContext(AccountStateContext)