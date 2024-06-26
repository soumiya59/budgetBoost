/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState, useEffect } from 'react';
import RecordApi from '../services/api/RecordApi';
import AccountApi from '../services/api/AccountApi';
import EditRecordModal from '../components/modals/EditRecordModal';
import swal from 'sweetalert';

function Record({type, amount,  id, description, category, account_id ,fetchRecords}) {
  
  const [account, setAccount] = useState({});
  const [viewRecord, setViewRecord] = useState(false);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = () => {
    AccountApi.getAccount(account_id)
      .then(({ data }) => {
        setAccount(data.account);  
      })
      .catch((err) => {
        console.log(err);
      });
  }
 
  const deleteRecord = () => {
    RecordApi.deleteRecord(id)
      .then(() => {
        setViewRecord(false);
        fetchRecords()
      })
      .catch((err) => {
        console.log(err);
      });
      swal("Record Deleted successfully!");
  }

  const showRecord = () => {
    setViewRecord(!viewRecord);
  }
  const handleRecordEdited = () => {
    setViewRecord(false);
    swal("Record Edited successfully!");
    fetchRecords();
    
  }
  const handleCloseModal = () => {
    setViewRecord(false);
  }

  const backgroundColor = type === 'expense' ? '#aca7cb' :
                          type === 'income' ? '#958bc3' : '#aca7cb';
  const imageSrc = account?.name === 'saving' ? 'saving.png' : 
                   account?.name === 'cash' ? 'cash.png' : 
                   account?.name === 'general' ? 'general.png' : 
                   account?.name === 'creditcard' ? 'creditcard.png' : 
                   account?.name === 'loan' ? 'loan.png' : 
                   account?.name === 'bank' ? 'bank.png' : 
                   'general.png';
  
  return (
    <>
    <button onClick={showRecord} style={{ backgroundColor }} className=" p-4 rounded flex flex-col md:flex-row my-4 items-center text-left w-full ">
      <div className='flex items-center flex-none w-36 '>
        <img src={`/accounts/${imageSrc}`} alt="recordLogo" className=" w-10 me-10" />
        <p>{category}</p>
      </div>

      <div className='shrink w-28 mx-10 text-center'>
        <p>{account?.name}</p>
      </div>

      <div className=' flex-auto '>
        {description !== ''  || description !== null ? <p>{description}</p> : ''}
      </div>

      <div className="ms-5 text-gray-800 text-end">
        {type=="income" ? 
        <p><span className="uppercase text-green-800">{account.currency}</span>
          <span className="text-green-800"> +{amount}</span>  
        </p> :
        <p><span className="uppercase text-red-800">{account.currency}</span>
          <span className='text-red-800'> -{amount}</span>
        </p>
        }
      </div>
    </button>

      {viewRecord &&  (
        <EditRecordModal onClose={handleCloseModal} onRecordEdited={handleRecordEdited} onRecordDeleted={deleteRecord} id={id}/>
      )}
    </>
  );
}

export default Record;