import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Goal from '../components/Goal';
import GoalApi from '../services/api/GoalApi';
import EditGoalModal from '../components/modals/EditGoalModal';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function GoalView() {
  const [goal, setGoal] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    fetchGoal();
  }, []);

  const fetchGoal = ()=>{
    GoalApi.getGoal(id)
      .then(({ data }) => {
        setGoal(data.goal);
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
    GoalApi.deleteGoal(id)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
      swal("Goal Deleted successfully!");
      navigate('/goals')
  }
  const handleGoalEdited = () => {
    setShowModal(false);
    swal("Goal Edited successfully!");
    fetchGoal();
  }


  return (
    <>
        {/* <div className="max-w-screen-xl h-screen flex-wrap items-center mx-auto p-6 pt-10"> */}
        <div className="max-w-screen-xl h-screen flex-wrap items-center mx-auto pt-10 ps-5">
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
          <div className='me-5'>
            <Goal key={goal.id} type={goal.name} balance={goal.balance} currency={goal.currency} idGoal={goal.id}/>
          </div>
        </div>
      {showModal &&  (
        <EditGoalModal onClose={handleCloseModal} onGoalEdited={handleGoalEdited} />
      )}
    </>
  );
}

export default GoalView;
