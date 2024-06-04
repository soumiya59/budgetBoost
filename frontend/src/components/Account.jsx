// eslint-disable-next-line react/prop-types
function Account({type, balance, currency,id}) {

  const backgroundColor = type === 'saving' ? '#aca7cb' :
                          type === 'cash' ? '#aca9bb' : 
                          type === 'general' ? '#d8d5e7' : 
                          type === 'creditcard' ? '#d2e6e7' : 
                          type === 'loan' ? '#cecbdd' : 
                          type === 'bank' ? '#bfcdda' : 
                          '#aca7cb';
  const imageSrc = type === 'saving' ? 'saving.png' : 
                   type === 'cash' ? 'cash.png' : 
                   type === 'general' ? 'general.png' : 
                   type === 'creditcard' ? 'creditcard.png' : 
                   type === 'loan' ? 'loan.png' : 
                   type === 'bank' ? 'bank.png' : 
                   'general.png';
  
  return (
    <a href={`/accounts/${id}`} style={{ backgroundColor }} className="p-4 me-5 rounded flex flex-col md:flex-row my-4 items-center justify-between ">
      <img src={`/accounts/${imageSrc}`} alt="accountLogo" className=" w-12" />
      <div className="ms-5 text-gray-800 text-end">
        <p className="uppercase">{type}</p>
        <p><span className="uppercase">{currency}</span> {balance}</p>
      </div>
    </a>
  );
}

export default Account;