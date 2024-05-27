import {axiosClient} from '../../api/axios'; 

const RecordApi = {
    // getCsrf : async () => {
    //     return await axiosClient.get('/sanctum/csrf-cookie')
    // },
    getAllMyRecords : async () => {
        return await axiosClient.get('/myrecords/')
    },
    getAccountRecords : async (accountId) => {
        return await axiosClient.get('/myrecords/'+accountId)
    },
    getRecord : async (id) => {
        return await axiosClient.get('/myrecords/'+id)
    },
    deleteRecord : async (id) => {
        return await axiosClient.delete('/myrecords/'+id)
    },
    editRecord : async (id,name,currency,balance) => {
        return await axiosClient.put('/myrecords/'+id,{name,currency,balance})
    },
    addRecord : async (account_id,amount,type,currency,category,description) => {
        return await axiosClient.post('/records',{account_id,amount,type,currency,category,description})
    },
    getCategories : async () => {
        return await axiosClient.get('/categories')
    }

}

export default RecordApi;