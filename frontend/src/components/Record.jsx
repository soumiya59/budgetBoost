/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState, useEffect } from 'react';
import AccountApi from '../services/api/AccountApi';

function Record({type, amount, currency, id, description, category, account_id}) {
  
  const [account, setAccount] = useState([]);

  useEffect(() => {
    AccountApi.getAccount(account_id)
      .then(({ data }) => {
        setAccount(data.account.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const backgroundColor = type === 'expense' ? '#aca7cb' :
                          type === 'income' ? '#958bc3' : '#aca7cb';
  const imageSrc = account === 'saving' ? 'saving.png' : 
                   account === 'cash' ? 'cash.png' : 
                   account === 'general' ? 'general.png' : 
                   account === 'creditcard' ? 'creditcard.png' : 
                   account === 'loan' ? 'loan.png' : 
                   account === 'bank' ? 'bank.png' : 
                   'general.png';
  
  return (
    <a href={`/records/${id}`} style={{ backgroundColor }} className="mx-4 p-4 rounded flex flex-col md:flex-row my-4 items-center text-left">
      <div className='flex items-center flex-none w-36 '>
        <img src={`/accounts/${imageSrc}`} alt="accountLogo" className=" w-10 me-10" />
        <p>{category}</p>
      </div>

      <div className='shrink w-28 mx-10 text-center'>
        <p>{account}</p>
      </div>

      <div className=' flex-auto '>
      <p>{description}</p>
      </div>

      <div className="ms-5 text-gray-800 text-end">
        {type=="income" ? 
        <p><span className="uppercase text-green-800">{currency}</span>
          <span className="text-green-800"> +{amount}</span>  
        </p> :
        <p><span className="uppercase text-red-800">{currency}</span>
          <span className='text-red-800'> -{amount}</span>
        </p>
        }
      </div>
    </a>
  );
}

export default Record;