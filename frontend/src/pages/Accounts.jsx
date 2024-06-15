import { useState, useEffect } from 'react';
import Account from '../components/Account';
import AccountApi from '../services/api/AccountApi';
import AddAccountModal from '../components/AddAccountModal';
import swal from 'sweetalert';


function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = () => {
    AccountApi.getAccounts()
      .then(({ data }) => {
        setAccounts(data.accounts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddAccount = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleAccountAdded = () => {
    setShowModal(false); 
    swal("Account Added successfully!");
    fetchAccounts();
  };

  return (
    <>
        <div className="max-w-screen-xl h-screen flex-wrap items-center mx-auto  pt-10 ps-5">
          <button
            onClick={handleAddAccount}
            className="bg-blue1 hover:bg-light-blue1 text-beig-light font-bold py-2 px-4 rounded flex ms-auto me-5 w-36"
          >
            Add Account
          </button>
          <br />
          <div>
            {accounts.map((item) => (
              <Account key={item.id} name={item.name} balance={item.balance} currency={item.currency} id={item.id}/>
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
