/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useTranslation } from 'next-i18next';
function Account({name, balance, currency,id}) {
  const { t } = useTranslation();
  const backgroundColor = name === 'saving' ? '#d3bbe3' :
                          name === 'creditcard' ? '#b5ebba' : 
                          name === 'general' ? '#b5b7eb' : 
                          name === 'cash' ? '#b5c9eb' : 
                          name === 'loan' ? '#b7cdeb' : 
                          name === 'bank' ? '#bcdeec' : 
                          '#aca7cb';
  const imageSrc = name === 'saving' ? 'saving.png' : 
                   name === 'cash' ? 'cash.png' : 
                   name === 'general' ? 'general.png' : 
                   name === 'creditcard' ? 'creditcard.png' : 
                   name === 'loan' ? 'loan.png' : 
                   name === 'bank' ? 'bank.png' : 
                   'general.png';
  
  return (
    <a href={`/accounts/${id}`} style={{ backgroundColor }} className="p-4 me-5 rounded flex flex-col md:flex-row my-4 items-center justify-between ">
      <img src={`/accounts/${imageSrc}`} alt="accountLogo" className=" w-12" />
      <div className="ms-5 text-gray-800 text-end">
        <p className="uppercase">{t(name)}</p>
        <p><span className="uppercase">{currency}</span> {balance}</p>
      </div>
    </a>
  );
}

export default Account;