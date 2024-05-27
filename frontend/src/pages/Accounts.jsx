import { useState, useEffect } from 'react';
import Account from '../components/Account';
import AccountApi from '../services/api/AccountApi';
import AddAccountModal from '../components/AddAccountModal';

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch accounts when component mounts
    AccountApi.getAccounts()
      .then(({ data }) => {
        setAccounts(data.accounts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddAccount = () => {
    setShowModal(true); // Show the modal when Add Account button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  const handleAccountAdded = () => {
    // Handle actions after an account is added (if needed)
    setShowModal(false); // Hide the modal after adding the account
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
