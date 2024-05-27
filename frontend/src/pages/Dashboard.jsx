import Account from '../components/Account'
import { useState,useEffect } from 'react';
import AccountApi from '../services/api/AccountApi';

function Dashboard() {
  const [accounts,setAccounts] = useState([])
  useEffect(() => {
    AccountApi.getAccounts().then(({data})=>{
      setAccounts(data.accounts)
    }).catch((err)=>{
      console.log(err)
    })
  }, []);

  return (
    <div className='h-screen'>
        <div className=" max-w-screen-xl flex flex-wrap items-center justify-start mx-auto p-6 border-b-2 border-slate-500 pt-10">
            {accounts.map((item) => (
              <Account key={item.id} type={item.name} balance={item.balance} currency={item.currency} />
            ))}
        </div>
     </div>
  )
}

export default Dashboard
