import { useState, useEffect } from 'react';
import Record from '../components/Record';
import RecordApi from '../services/api/RecordApi';
import AddRecordModal from '../components/modals/AddRecordModal';
import swal from 'sweetalert';
import AccountApi from '../services/api/AccountApi';
import { format, parseISO } from 'date-fns';

function Records() {
  const [records, setRecords] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRecordType, setSelectedRecordType] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const sortedRecords = [...records].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.updated_at) - new Date(a.updated_at);
    } else {
      return new Date(a.updated_at) - new Date(b.updated_at);
    }
  });

  const filteredRecords = sortedRecords.filter(record => {
    const recordDate = parseISO(record.updated_at);
    const isSameMonth = recordDate.getMonth() === selectedMonth.getMonth() && recordDate.getFullYear() === selectedMonth.getFullYear();
    return isSameMonth &&
           (!selectedAccount || record.account_id === selectedAccount) &&
           (!selectedCategory || record.category === selectedCategory) &&
           (!selectedRecordType || record.type === selectedRecordType);
  });

  const groupedRecords = filteredRecords.reduce((acc, record) => {
    const date = format(parseISO(record.updated_at), 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(record);
    return acc;
  }, {});

  const totalExpenses = filteredRecords
    .filter(record => record.type === "expense")
    .reduce((total, record) => total + parseFloat(record.amount), 0);

  useEffect(() => {
    fetchRecords();
    AccountApi.getAccounts().then(({ data }) => {
      setAccounts(data.accounts);
    }).catch((err) => {
      console.log(err);
    });
    RecordApi.getCategories().then(({ data }) => {
      setCategories(data.categories);
    }).catch((err) => {
      console.log(err);
    });
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

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleAccountSelection = (accountId) => {
    setSelectedAccount(accountId);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const handleRecordTypeSelection = (type) => {
    setSelectedRecordType(type);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(new Date(e.target.value));
  };

  const handlePreviousMonth = () => {
    setSelectedMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setSelectedMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + 1);
      return newMonth;
    });
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-6 pt-10">
        <div className='flex mt-8 h-screen '>
          {/* sidebar */}
          <div className='flex-none text-slate-300 border-2 rounded-lg border-slate-600 p-5 mr-5'>
            <button
              onClick={handleAddRecord}
              className="bg-blue1 hover:bg-light-blue1 text-beig-light font-bold py-2 px-4 rounded w-full"
            > Add Record </button>
            <br />
            <input
              type="text"
              className="w-full h-10 border border-gray-400 bg-dark-blue1 rounded text-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent my-5"
              placeholder="Search"
              value={searchTerm}
              onChange={search}
            />
            <p className='font-bold mb-2'>Sort By</p>
            <select
              className="w-full h-10 border border-gray-400 bg-dark-blue1 rounded text-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="newest" className="option-padding">Newest</option>
              <option value="oldest" className="option-padding">Oldest</option>
            </select>
                        <p className='font-bold mt-5 mb-3'>Accounts</p>
            <button
              className={`flex ${selectedAccount === null ? ' text-blue1' : ''}`}
              onClick={() => handleAccountSelection(null)}
            >
              <img src={` ${selectedAccount===null? 'eye1.png' : 'eye2.png'}`} alt="" className='me-2 w-4 my-auto' />
              All Accounts
            </button>
            {accounts.map((account) => (
              <p key={account.id}>
                <button
                  className={`flex ${selectedAccount === account.id ? 'text-blue1' : ''}`}
                  onClick={() => handleAccountSelection(account.id)}
                >
                  <img src={` ${selectedAccount===account.id? 'eye1.png' : 'eye2.png'}`} alt="" className='me-2 w-4 my-auto' />
                  {account.name}
                </button>
              </p>
            ))}
            <p className='font-bold mt-5 mb-3'>Categories</p>
            <button
              className={`flex ${selectedCategory === null ? ' text-blue1' : ''}`}
              onClick={() => handleCategorySelection(null)}
            >
              <img src={` ${selectedCategory===null? 'eye1.png' : 'eye2.png'}`} alt="" className='me-2 w-4 my-auto' />
              All Categories
            </button>
            {categories.map((category) => (
              <p key={category.id}>
                <button
                  className={`flex ${selectedCategory === category.type ? 'text-blue1' : ''}`}
                  onClick={() => handleCategorySelection(category.type)}
                >
                  <img src={` ${selectedCategory===category.type? 'eye1.png' : 'eye2.png'}`} alt="" className='me-2 w-4 my-auto' />
                  {category.type}
                </button>
              </p>
            ))}
            <p className='font-bold mt-5 mb-3'>Record types</p>
            <button
              className={`flex ${selectedRecordType === null ? ' text-blue1' : ''}`}
              onClick={() => handleRecordTypeSelection(null)}
            >
              <img src={` ${selectedRecordType===null? 'eye1.png' : 'eye2.png'}`} alt="" className='me-2 w-4 my-auto' />
              All record types
            </button>
            <button
              className={`flex ${selectedRecordType === 'income' ? ' text-blue1' : ''}`}
              onClick={() => handleRecordTypeSelection('income')}
            >
              <img src={` ${selectedRecordType==='income'? 'eye1.png' : 'eye2.png'}`} alt="" className='me-2 w-4 my-auto' />

              Income
            </button>
            <button
              className={`flex ${selectedRecordType === 'expense' ? 'text-blue1' : ''}`}
              onClick={() => handleRecordTypeSelection('expense')}
            >
              <img src={` ${selectedRecordType==='expense'? 'eye1.png' : 'eye2.png'}`} alt="" className='me-2 w-4 my-auto' />
              Expense
            </button>
          </div>
          {/* records */}
          <div className='flex-1'>
            <div className='flex justify-between items-center text-slate-300 mb-5'>
              <div className='flex justify-between'>
              <button onClick={handlePreviousMonth}>
                <img src="left.png" alt="" className='h-5 me-4' />
              </button>
              <input
                type="month"
                value={format(selectedMonth, 'yyyy-MM')}
                onChange={handleMonthChange}
                className="w-full border border-gray-400 bg-dark-blue1 rounded text-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <button onClick={handleNextMonth}>
                <img src="right.png" alt="" className='h-5 ms-2' />
              </button>
              </div>
            
              <p>- {totalExpenses} <span className='uppercase'>{accounts[0]?.currency}</span></p>
            </div>

            <div>
              {Object.entries(groupedRecords).map(([date, records]) => (
                <div key={date}>
                  {records.map((item) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <AddRecordModal onClose={handleCloseModal} onExpenseAdded={handleExpenseAdded} setRecords={setRecords} fetchRecords={fetchRecords} />
      )}
    </>
  );
}

export default Records;
