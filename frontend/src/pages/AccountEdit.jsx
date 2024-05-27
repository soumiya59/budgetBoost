import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Account from '../components/Account';
import AccountApi from '../services/api/AccountApi';
import EditAccountModal from '../components/EditAccountModal';
import { useNavigate } from "react-router-dom";

function AccountEdit() {
  const [account, setAccount] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    AccountApi.getAccount(id)
      .then(({ data }) => {
        setAccount(data.account);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };
  const edit = () => {
    setShowModal(true); // Show the modal when Add Account button is clicked
  }
  const deleteAcc = () => {
    AccountApi.deleteAccount(id)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
      navigate('/accounts')
  }
  const handleAccountEdited = () => {
    setShowModal(false); // Hide the modal after adding the account
  }


  return (
    <>
        <div className="max-w-screen-xl flex-wrap items-center mx-auto p-6 pt-10">
          <div className='flex justify-end '>
            <button
              onClick={edit}
              className="bg-mat-green hover:bg-bold-green text-beig-light font-bold py-2 px-4 rounded w-36 me-5"
            >
              edit
            </button>
            <button
              onClick={deleteAcc}
              className="bg-mat-green hover:bg-bold-green text-beig-light font-bold py-2 px-4 rounded w-36 me-5"
            >
              delete
            </button>
          </div>
          <br />
          <div>
            <Account key={account.id} type={account.name} balance={account.balance} currency={account.currency} id={account.id}/>
          </div>
        </div>
      {showModal &&  (
        <EditAccountModal onClose={handleCloseModal} onAccountEdited={handleAccountEdited} />
      )}
    </>
  );
}

export default AccountEdit;
