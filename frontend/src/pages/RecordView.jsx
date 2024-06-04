import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Record from '../components/Record';
import RecordApi from '../services/api/RecordApi';
import EditRecordModal from '../components/EditRecordModal';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function RecordView() {
  const [record, setRecord] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    fetchRecord();
  }, []);

  const fetchRecord = ()=>{
    RecordApi.getRecord(id)
      .then(({ data }) => {
        setRecord(data.record);
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
    RecordApi.deleteRecord(id)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
      swal("Record Deleted successfully!");
      navigate('/records')
  }
  const handleRecordEdited = () => {
    setShowModal(false);
    swal("Record Edited successfully!");
    fetchRecord();
  }


  return (
    <>
        <div className="max-w-screen-xl h-screen flex-wrap items-center mx-auto p-6 pt-10">
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
            <Record key={record.id} type={record.name} balance={record.balance} currency={record.currency} id={record.id}/>
          </div>
        </div>
      {showModal &&  (
        <EditRecordModal onClose={handleCloseModal} onRecordEdited={handleRecordEdited} />
      )}
    </>
  );
}

export default RecordView;
