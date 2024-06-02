import { useState, useEffect } from 'react';
import Account from '../components/Account';
import AccountApi from '../services/api/AccountApi';
import AddAccountModal from '../components/AddAccountModal';
import swal from 'sweetalert';


function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AccountApi.getAccounts()
      .then(({ data }) => {
        setAccounts(data.accounts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddAccount = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleAccountAdded = () => {
    setShowModal(false); 
    swal("Account Added successfully!");
  };

  return (
    <>
        <div className="max-w-screen-xl h-screen flex-wrap items-center mx-auto p-6 pt-10">
          <button
            onClick={handleAddAccount}
            className="bg-mat-green hover:bg-bold-green text-beig-light font-bold py-2 px-4 rounded flex ms-auto me-5 w-36"
          >
            Add Account
          </button>
          <br />
          <div>
            {accounts.map((item) => (
              <Account key={item.id} type={item.name} balance={item.balance} currency={item.currency} id={item.id}/>
            ))}
          </div>
        </div>
      {showModal &&  (
        <AddAccountModal onClose={handleCloseModal} onAccountAdded={handleAccountAdded} />
      )}
    </>
  );
}

export default Accounts;
