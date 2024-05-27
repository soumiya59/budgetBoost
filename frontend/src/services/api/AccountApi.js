import {axiosClient} from '../../api/axios'; 

const AccountApi = {
    // getCsrf : async () => {
    //     return await axiosClient.get('/sanctum/csrf-cookie')
    // },
    getAccounts : async () => {
        return await axiosClient.get('/myaccounts')
    },
    getAccount : async (id) => {
        return await axiosClient.get('/myaccounts/'+id)
    },
    deleteAccount : async (id) => {
        return await axiosClient.delete('/myaccounts/'+id)
    },
    editAccount : async (id,name,currency,balance) => {
        return await axiosClient.put('/myaccounts/'+id,{name,currency,balance})
    },
    addAccount : async (name,currency,balance) => {
        return await axiosClient.post('/addaccount',{name,currency,balance})
    },

}

export default AccountApi;