/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import GoalApi from '../services/api/GoalApi';
import EditGoalModal from '../components/modals/EditGoalModal';
import swal from 'sweetalert';

function Goal({ name, current_amount,target_amount, currency, idGoal, fetchGoals }) {
  const { id } = useParams();
  const [editGoalModal, setEditGoalModal] = useState(false);
  const progressPercentage = (current_amount / target_amount) * 100;


  const editGoal = (event) => {
    event.stopPropagation(); 
    event.preventDefault();
    setEditGoalModal(!editGoalModal);
  }

  const deleteGoal = () => {
    GoalApi.deleteGoal(idGoal)
      .then(() => {
        setEditGoalModal(false);
        fetchGoals();
      })
      .catch((err) => {
        console.log(err);
      });
    swal("Goal Deleted successfully!");
  }

  const handleGoalEdited = () => {
    setEditGoalModal(false);
    swal("Goal Edited successfully!");
    fetchGoals();
  }

  const handleCloseModal = () => {
    setEditGoalModal(false);
  }

  return (
    <>
      <a href={`/goals/${idGoal}`}>
        <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-5 mb-8 sm:flex-row flex-col bg-light-grey items-center">
          <div className="w-16 h-10 sm:mr-8 inline-flex items-center justify-center rounded-full flex-shrink-0">
            <img src="/goals/cash.png" alt="" />
          </div>

          <div className="flex-1">
            <div className='flex justify-between'>
              <div>
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">{name}</h2>
                <p className="leading-relaxed text-base">{current_amount} <span className='uppercase'> {currency}</span></p>
              </div>
              <div className='self-center'>
                {id == null &&
                  <button onClick={editGoal}>
                    <img src="edit.png" alt="" className='w-5' />
                  </button>
                }
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-300 rounded-full dark:bg-gray-700">
              <div className="bg-indigo-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full" style={{ width: `${progressPercentage}%` }}> {Math.round(progressPercentage)}%</div>
            </div>
          </div>
        </div>
      </a>

      {editGoalModal && (
        <EditGoalModal onClose={handleCloseModal} onGoalEdited={handleGoalEdited} onGoalDeleted={deleteGoal} id={idGoal} />
      )}
    </>
  );
}

export default Goal;
