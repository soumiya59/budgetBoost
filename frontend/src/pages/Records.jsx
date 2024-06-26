import { useState, useEffect } from 'react';
import Record from '../components/Record';
import RecordApi from '../services/api/RecordApi';
import AddRecordModal from '../components/modals/AddRecordModal';
import swal from 'sweetalert';
import AccountApi from '../services/api/AccountApi';

function Records() {
  const [records, setRecords] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const sortedRecords = records.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const totalExpenses = records
    .filter(record => record.type === "expense")
    .reduce((total, record) => total + parseFloat(record.amount), 0);


  useEffect(() => {
    fetchRecords();
    // AccountApi.getAccounts().then(({data})=> setAccounts(data.accounts))
    AccountApi.getAccounts().then(({data})=>{
      setAccounts(data.accounts)
    }).catch((err)=>{
      console.log(err)
    })
  }, []);

  const fetchRecords = () => {
    RecordApi.getAllMyRecords()
      .then(({ data }) => {
        setRecords(data.records);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddRecord = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleExpenseAdded = () => {
    setShowModal(false);
    swal("Record Added successfully!");
    fetchRecords();
  };

  const search = (e) => {
    const search = e.target.value;
    setSearchTerm(search);

    RecordApi.searchRecords(search)
      .then(({ data }) => {
        setSearchData(data.records);
        console.log(data.records);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

    return (
        <div>
        <div className="max-w-screen-xl h-screen mx-auto p-6 pt-10">
          <div className='flex items-center mb-10'>
            <form action="">
            <input
              type="text"
              className="w-60 h-10 border border-gray-400 bg-dark-blue1 rounded text-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Search"
              value={searchTerm}
              onChange={search}
            />
            </form>
            <button
              onClick={handleAddRecord}
              className="bg-blue1 hover:bg-light-blue1 text-beig-light font-bold py-2 px-4 rounded flex ms-auto  w-36"
            >
              Add Record
            </button>
          </div>
          <div className='text-slate-300 text-end '>
            <p>- {totalExpenses} <span className='uppercase'>{accounts[0]?.currency}</span></p>
          </div>

          <div>
          {(searchTerm ? searchData : sortedRecords).map((item) => (
            <Record
              key={item.id}
              id={item.id}
              type={item.type}
              description={item.description}
              amount={item.amount}
              category={item.category}
              account_id={item.account_id}
              fetchRecords={fetchRecords}
            />
          ))}
          </div>
        </div>
        {showModal &&  (
          <AddRecordModal onClose={handleCloseModal} onExpenseAdded={handleExpenseAdded} setRecords={setRecords} fetchRecords={fetchRecords}/>
        )}
        </div>
    );
  
}

export default Records;
