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
    editGoal : async (id,name,target_amount,currect_amount,completion_date,description) => {
        return await axiosClient.put('/mygoals/'+id,{name,target_amount,currect_amount,completion_date,description})
    },
    addGoal : async (name,target_amount,currect_amount,completion_date,description) => {
        return await axiosClient.post('/addgoal',{name,target_amount,currect_amount,completion_date,description})
    },
    addamount : async (goalId,amount) => {
        return await axiosClient.put('/addamount',{goalId,amount})
    },

}

export default GoalApi;