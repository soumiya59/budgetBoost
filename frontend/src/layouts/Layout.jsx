import { useState } from 'react';
import {Outlet, Link} from 'react-router-dom';
import { useEffect , useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStateContext } from '../context/UserContext';
import { useContext } from 'react';
import UserApi from '../services/api/UserApi';
import i18n from "../i18n/index";
import { useTranslation } from 'next-i18next';

function Layout() {
  const navigate = useNavigate();
  const context = useContext(UserStateContext);
  const {user,setUser,setAuthenticated,logout} = useContext(UserStateContext);
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] =  useState(i18n.language);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  } ,[])

  
  const handleChangeLanguage = (eventKey) => {
        i18n.changeLanguage(eventKey);
        setSelectedLanguage(eventKey); 
        setLangDropdownOpen(false);  
  };

  const logoutCallback = () => {
    UserApi.logout().then(()=>{
      logout()
      navigate('/login')
    }).catch((err)=>{
      console.log(err)
    })
  }


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleLangDropdown = () => {
    setLangDropdownOpen(!langDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setLangDropdownOpen(false);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


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
          <div className="relative flex items-center justify-around md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">       
          
        {/* language dropdown   */}
        <div className="relative inline-block text-left " ref={dropdownRef}>
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md shadow-sm px-2 py-2 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bold-green "
            id="language-dropdown"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={toggleLangDropdown}
          >
            {selectedLanguage}
            <svg
              className="-mr-1 ml-2 pt-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414-1.414l5-5A1 1 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {langDropdownOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-dropdown"
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className="text-gray-700 block ps-4 py-2 text-sm"
                role="menuitem"
                onClick={() => handleChangeLanguage('English')}
              >
                English
              </a>
              <a
                href="#"
                className="text-gray-700 block ps-4 py-2 text-sm"
                role="menuitem"
                onClick={() => handleChangeLanguage('Francais')}
              >
                Francais
              </a>
            </div>
          </div>
        )}
      </div>

      {/* user menu dropdown */}
       <button type="button" onClick={toggleDropdown} className="flex text-sm rounded-full md:me-0 ring-2  ring-mat-green focus:ring-bold-green dark:focus:ring-bold-green" id="user-menu-button" aria-expanded={isDropdownOpen} data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom"
      ref={dropdownRef}
       >


            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="/profile.png" alt="user photo"/>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-6 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
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
          {/* mobile menu */}
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
                <Link to="/"> {t('Dashboard')} </Link>
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-subtle-green md:p-0 dark:text-mat-green md:dark:hover:text-bold-green dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link to="/accounts"> {t('Accounts')} </Link>
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-subtle-green md:p-0 dark:text-mat-green md:dark:hover:text-bold-green dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link to="/records"> {t('Records')} </Link>
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-subtle-green md:p-0 dark:text-mat-green md:dark:hover:text-bold-green dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link to="/goals"> {t('Goals')} </Link>
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-subtle-green  md:p-0 dark:text-mat-green md:dark:hover:text-bold-green dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link to="/pricing"> {t('Pricing')} </Link>
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