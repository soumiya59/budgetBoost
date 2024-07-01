import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Account from '../components/Account';
import AccountApi from '../services/api/AccountApi';
import EditAccountModal from '../components/modals/EditAccountModal';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { useTranslation } from 'next-i18next';

function AccountView() {
  const { t } = useTranslation();
  const [account, setAccount] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = ()=>{
    AccountApi.getAccount(id)
      .then(({ data }) => {
        setAccount(data.account);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const edit = () => {
    setShowModal(true); 
  }

  const deleteAcc = () => {
    AccountApi.deleteAccount(id)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
      swal("Account Deleted successfully!");
      navigate('/accounts')
  }
  const handleAccountEdited = () => {
    setShowModal(false);
    swal("Account Edited successfully!");
    fetchAccount();
  }


  return (
    <>
        <div className="max-w-screen-xl h-screen flex-wrap items-center mx-auto p-6 pt-10">
          <div className='flex justify-end '>
            <button
              onClick={edit}
              className="bg-mat-green hover:bg-bold-green text-beig-light font-bold py-2 px-4 rounded w-36 me-5"
            >
              {t('Edit')}
            </button>
            <button
              onClick={deleteAcc}
              className="bg-mat-green hover:bg-bold-green text-beig-light font-bold py-2 px-4 rounded w-36 me-5"
            >
              {t('Delete')}
            </button>
          </div>
          <br />
          <div>
            <Account key={account.id} name={account.name} balance={account.balance} currency={account.currency} id={account.id}/>
          </div>
        </div>
      {showModal &&  (
        <EditAccountModal onClose={handleCloseModal} onAccountEdited={handleAccountEdited} />
      )}
    </>
  );
}

export default AccountView;
