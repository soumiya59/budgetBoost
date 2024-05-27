import { useState } from 'react';
import {Outlet, Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStateContext } from '../context/UserContext';
import { useContext } from 'react';
import UserApi from '../services/api/UserApi';

function Layout() {
  const navigate = useNavigate();
  // const [user, setUser] = useState({});
  const context = useContext(UserStateContext);
  const {user,setUser,setAuthenticated,logout} = useContext(UserStateContext);

  useEffect(() => {
    if(!context.authenticated){
      navigate('/login')
    }
    UserApi.getUser().then(({data})=>{
      setUser(data)
      setAuthenticated(true)
    }).catch(()=>{
      logout()
      navigate('/login')
    })

    // axiosClient.get('/api/user').then(({data})=>{
    //   setUser(data)
    // }).catch((err)=>{
    //   console.log(err)
    // })

  } ,[])

  const logoutCallback = () => {
    UserApi.logout().then(()=>{
      logout()
      navigate('/login')
    }).catch((err)=>{
      console.log(err)
    })
  }

  // const logout = (e) => {
  //   e.preventDefault();
  //   axiosClient.post('/logout').then(()=>{
  //     window.localStorage.removeItem('ACCES_TOKEN');
  //     navigate('/login')
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


    return (
        <div>
          <nav className="border-gray-200 bg-light-grey relative">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <Link to="/">
            <p className="flex items-center space-x-3 space-y-2 rtl:space-x-reverse">
              <img src="/logo.svg" className="h-8" alt="" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-mat-green font-mono">BudgetBoost</span>
            </p>
          </Link> 
          <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">       
            <button type="button" onClick={toggleDropdown} className="flex text-sm rounded-full md:me-0 ring-2  ring-mat-green focus:ring-bold-green dark:focus:ring-bold-green" id="user-menu-button" aria-expanded={isDropdownOpen} data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">

            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="/profile.png" alt="user photo"/>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-5 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{user.name}</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                </li>
                <li>
                    <button onClick={logoutCallback} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left">Sign out</button>
                </li>
              </ul>
            </div>
          )}
          <button type="button" onClick={toggleMobileMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
          </button>
          </div>
          <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-subtle-green md:p-0 dark:text-mat-green md:dark:hover:text-bold-green dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >
                <Link to="/"> Dashboard </Link>
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-subtle-green md:p-0 dark:text-mat-green md:dark:hover:text-bold-green dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link to="/accounts"> Accounts </Link>
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-subtle-green md:p-0 dark:text-mat-green md:dark:hover:text-bold-green dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link to="/records"> Records </Link>
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-subtle-green md:p-0 dark:text-mat-green md:dark:hover:text-bold-green dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link to="/goals"> Goals </Link>
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-subtle-green  md:p-0 dark:text-mat-green md:dark:hover:text-bold-green dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link to="/pricing"> Pricing </Link>
            </li>
          </ul>
          </div>
        </div>
        </nav>

             <main className=" bg-royal-green font-mono">
                <Outlet/>
             </main>
             
            {/* <footer>footer</footer> */}
        </div>
    );
}

export default Layout;