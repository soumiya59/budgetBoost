import { axiosClient } from '../../api/axios';

const UserApi = {
    getCsrf: async () => {
        return await axiosClient.get('/sanctum/csrf-cookie')
    },
    login: async (email, password) => {
        return await axiosClient.post('/login', { email, password })
    },
    logout: async () => {
        return await axiosClient.post('/logout',)
    },
    register: async (name, email, password, password_confirmation) => {
        return await axiosClient.post('/register', { name, email, password, password_confirmation })
    },
    getUser: async () => {
        return await axiosClient.get('/api/user')
    },

}

export default UserApi;