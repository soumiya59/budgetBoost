import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GoalApi from '../services/api/GoalApi';
import AddAmountModal from '../components/modals/AddAmountModal';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { useTranslation } from 'next-i18next';

function GoalView() {
  const { t } = useTranslation();
  const [goal, setGoal] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const { id } = useParams();
  const amountNeeded = goal.target_amount - goal.current_amount;
  const progressPercentage = (goal.current_amount / goal.target_amount) * 100;

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
  const addAmount = () => {
    setShowModal(true); 
  }

  const handleAmountAdded = () => {
    setShowModal(false);
    swal("Amount Added successfully!");
    fetchGoal();
  }
  const setGoalAsReached = () => {
    GoalApi.setGoalAsReached(id)
      .then(() => {
        swal("Goal reached successfully!");
        navigate('/goals')
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <>
        <div className="max-w-screen-xl h-screen flex-wrap items-center mx-auto pt-20 ps-5">
          <div className='me-5 flex justify-between'>
            <div>
              <h1 className='text-light-grey text-2xl'>{goal.name}</h1>
              <p className="text-xl text-slate-400">{t('Target Date')} : {goal.completion_date}</p>
            </div>
            <div>
              <button
                onClick={addAmount}
                className="bg-blue1 hover:bg-light-blue1 text-beig-light font-bold py-1 px-2 rounded  me-4"
              >
                {t('Add Amount')}
              </button>
              <button
                onClick={setGoalAsReached}
                className="bg-blue1 hover:bg-light-blue1 text-beig-light font-bold py-1 px-2 rounded"
              >
                {t('Set as reached')}
              </button>
            </div>
          </div>

          <div className='flex justify-center text-indigo-600 mt-14'>
            <div className="radial-progress" style={{ "--value": progressPercentage, "--size": "16rem", "--thickness": "2rem" }} role="progressbar">{parseInt(progressPercentage)}%</div>
            <div className='ms-14 self-center text-slate-400 text-lg '>
              <p className='py-3 '>{t('Current Amount')} : <span className=' text-slate-300'>{goal.current_amount} <span className='uppercase'>{goal.currency}</span></span> </p>
              <p className='py-3 '>{t('Target Amount')} : <span className=' text-slate-300'>{goal.target_amount} <span className='uppercase'>{goal.currency}</span></span> </p>
              <p className='py-3 '>{t('Amount needed to reach goal')} : <span className=' text-slate-300'>{amountNeeded}  <span className='uppercase'>{goal.currency}</span></span></p>
              <p className='py-3 '>{t('Last added amount')} : <span className=' text-slate-300'>{goal.last_added_amount} <span className='uppercase'>{goal.currency}</span></span></p>
            </div>
          </div>
            
        </div>
      {showModal &&  (
        <AddAmountModal id={id} onClose={handleCloseModal} onAmountAdded={handleAmountAdded} />
      )}
    </>
  );
}

export default GoalView;
