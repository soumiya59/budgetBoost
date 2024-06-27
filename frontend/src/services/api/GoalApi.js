import {axiosClient} from '../../api/axios'; 

const GoalApi = {
    getAllMyGoals : async () => {
        return await axiosClient.get('/mygoals/')
    },
    getGoal : async (id) => {
        return await axiosClient.get('/goals/'+id)
    },
    deleteGoal : async (id) => {
        return await axiosClient.delete('/mygoals/'+id)
    },
    editGoal : async (id,name,target_amount,current_amount,completion_date) => {
        return await axiosClient.put('/goals/'+id,{name,target_amount,current_amount,completion_date})
    },
    addGoal : async (name,target_amount,current_amount,completion_date) => {
        return await axiosClient.post('/addgoal',{name,target_amount,current_amount,completion_date})
    },
    addamount : async (goalId,amount) => {
        return await axiosClient.put('/addamount',{goalId,amount})
    },
    setGoalAsReached : async (id) => {
        return await axiosClient.put('/setgoalasreached/'+id)
    }

}

export default GoalApi;