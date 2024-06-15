import { useState, useEffect } from 'react';
import Goal from '../components/Goal';
import GoalApi from '../services/api/GoalApi';
import AddGoalModal from '../components/AddGoalModal';
import swal from 'sweetalert';

function Goals() {

  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = () => {
    GoalApi.getAllMyGoals()
      .then(({ data }) => {
        setGoals(data.goals);
        console.log("🚀 ~ .then ~ data:", data.goals)
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
        <div className=" container max-w-screen-xl h-screen flex-wrap items-center mx-auto  pt-10 ps-5">
        
        <h1 className="text-2xl text-light-grey pt-10 ">Goals</h1>
        <p className="text-xl text-slate-400 mb-5">How much i saved ?</p>

          <br />
          <div>
            {
            goals.length>0? goals.map((item) => (
              <Goal key={item.id} name={item.name} current_amount={item.current_amount} currency={item.currency} id={item.id}/>
            )) 
            : 
            <div className="flex justify-center">
              <p className="text-xl text-center text-slate-400 mb-10">No Goals Found</p>
              <button className="bg-slate-400 text-white px-4 py-2 rounded-md" onClick={handleAddGoal}>Add Goal</button>
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