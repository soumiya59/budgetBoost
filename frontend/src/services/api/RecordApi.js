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
        return await axiosClient.get('/records/'+id)
    },
    deleteRecord : async (id) => {
        return await axiosClient.delete('/records/'+id)
    },
    editRecord : async (id, account_id, amount,type,currency,category,description) => {
        return await axiosClient.put('/records/'+id,{account_id,amount,type,currency,category,description})
    },
    addRecord : async (account_id,amount,type,currency,category,description) => {
        return await axiosClient.post('/records',{account_id,amount,type,currency,category,description})
    },
    // searchRecords : async (query) => {
    //     return await axiosClient.get('/records/search/',{query})
    // },
    searchRecords: async (query) => {
    // return await axiosClient.get('/records/search/', { params: { query } })
    return await axiosClient.get('/records/search/'+query)
    },

    getCategories : async () => {
        return await axiosClient.get('/categories')
    }

}

export default RecordApi;