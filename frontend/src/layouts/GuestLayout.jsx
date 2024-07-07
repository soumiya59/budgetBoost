import {Outlet} from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStateContext } from '../context/UserContext';

function GuestLayout() {
  const navigate = useNavigate();

  const context = useContext(UserStateContext);
  useEffect(() => {
    if (context.authenticated) {
      navigate('/');
    }
  }, []);
    return (
        <div>
             <main>
                <Outlet/>
             </main>
        </div>
    );
}

export default GuestLayout;