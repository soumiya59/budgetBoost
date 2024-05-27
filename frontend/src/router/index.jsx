import { createBrowserRouter} from 'react-router-dom'; 
import Login from '../pages/Login';
import Register from '../pages/Register';
import Layout from '../layouts/Layout';
import Dashboard from '../pages/Dashboard';
import Accounts from '../pages/Accounts';
import AccountEdit from '../pages/AccountEdit';
import Records from '../pages/Records';
import Pricing from '../pages/Pricing';
import Goals from '../pages/Goals';
import GuestLayout from '../layouts/GuestLayout';

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path:'/',
                element: <Dashboard/> 
            },
            {
                path:'/accounts',    
                element: <Accounts/>
            },
            {
                path:'/accounts/:id',    // Dynamic route for account details
                element: <AccountEdit/>
            },
            {
                path:'/records',    
                element: <Records/>
            },
            {
                path:'/pricing',    
                element: <Pricing/>
            },
            {
                path:'/goals',    
                element: <Goals/>
            },
            {
                path:'*',
                element: <div>404 Not Found</div>
            }
        ]
    },{
        element: <GuestLayout/>,
        children: [
            {
                path:'/login',
                element: <Login/>
            },
            {
                path:'/register',
                element: <Register/>
            },

        ]


    }

])