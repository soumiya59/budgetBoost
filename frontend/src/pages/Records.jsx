import { useState, useEffect } from 'react';
import Record from '../components/Record';
import RecordApi from '../services/api/RecordApi';
import AddRecordModal from '../components/AddRecordModal';
import swal from 'sweetalert';

function Records() {
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRecords();
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
    return (
        <div>

        <div className="max-w-screen-xl h-screen flex-wrap items-center mx-auto p-6 pt-10">
          <button
            onClick={handleAddRecord}
            className="bg-mat-green hover:bg-bold-green text-beig-light font-bold py-2 px-4 rounded flex ms-auto me-5 w-36"
          >
            Add Record
          </button>
          <br />
          <div>
            {records.map((item) => (
              <Record key={item.id} type={item.type} description={item.description} amount={item.amount} currency={item.currency} id={item.id} category={item.category} account_id={item.account_id}/>
            ))}
          </div>
        </div>
        {showModal &&  (
          <AddRecordModal onClose={handleCloseModal} onExpenseAdded={handleExpenseAdded} />
        )}
        </div>
    );
}

export default Records;