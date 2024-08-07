import { useState, useEffect } from 'react';
import Goal from '../components/Goal';
import GoalApi from '../services/api/GoalApi';
import AddGoalModal from '../components/modals/AddGoalModal';
import swal from 'sweetalert';
import { useTranslation } from 'next-i18next';

function Goals() {
  const { t } = useTranslation();

  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = () => {
    GoalApi.getAllMyGoals()
      .then(({ data }) => {
        setGoals(data.goals);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddGoal = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleGoalAdded = () => {
    setShowModal(false); 
    swal("Goal Added successfully!");
    fetchGoals();
  };

  return (
    <>
        <div className=" container max-w-screen-xl h-screen flex-wrap items-center mx-auto pt-10 ps-5">

        <div className='flex justify-between pt-10 mb-8'>
          <div>
            <h1 className="text-2xl text-light-grey">{t('Goals')}</h1>
            <p className="text-xl text-slate-400">{t('How much i saved ?')}</p>
          </div>
          <div>
            <button className="bg-blue1 hover:bg-light-blue1 text-beig-light font-bold py-2 px-4 rounded" onClick={handleAddGoal}>{t('Add Goal')}</button>
          </div>
        </div>
        
        <div>
            {
            goals.length>0? goals.map((item) => (
              <Goal key={item.id} name={item.name} current_amount={item.current_amount} target_amount={item.target_amount} currency={item.currency} idGoal={item.id} fetchGoals={fetchGoals}/>
            )) 
            : 
            <div className="flex justify-center">
              <p className="text-xl text-center text-slate-400 mb-10">{t('No Goals Found')}</p>
            </div>
            }
          </div>
        </div>

        {showModal &&  (
            <AddGoalModal onClose={handleCloseModal} onGoalAdded={handleGoalAdded} />
        )}
    </>
  );
}

export default Goals;