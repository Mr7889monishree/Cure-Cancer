import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import { Home, Onboarding, Profile} from './Pages';
import { useStateContext } from './context/Index';
import { usePrivy } from '@privy-io/react-auth';
import MedicalRecords from './Pages/Records/Index'
import SingleRecordDetails from './Pages/Records/SingleRecordDetails';
import ScreeningSchedule from './Pages/ScreeningSchedule';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, fetchUserByEmail, users } = useStateContext();
  const { user, authenticated, ready, login } = usePrivy();

  useEffect(() => {
    if (!ready) return;
  
    // If not authenticated, prompt login
    if (!authenticated) {
      login();
      return;
    }
  
    // If authenticated and we have user info
    if (authenticated && user) {
      const existingUser = users.find(u => u.createdBy === user.email.address);
  
      if (!existingUser && location.pathname !== "/onboarding") {
        navigate("/onboarding");
      } else if (existingUser && location.pathname === "/onboarding") {
        navigate("/profile");
      }
    }
  }, [ready, authenticated, user, users, navigate, location.pathname]);
  const isOnboardingRoute = location.pathname === "/onboarding";

  useEffect(() => {
    if (authenticated && user) {
      fetchUserByEmail(user.email.address);
    }
  }, [authenticated, user, fetchUserByEmail]);

  return (
    <div className="relative flex min-h-screen flex-row bg-[#13131a] p-6">
      {/* Show Sidebar and Navbar only when NOT on onboarding */}
      {!isOnboardingRoute && (
        <div className="relative mr-10 hidden sm:flex">
          <Sidebar />
        </div>
      )}

      <div className={`flex-1 ${!isOnboardingRoute ? 'mx-8 max-w-[1280px] sm:pr-5' : ''}`}>
        {!isOnboardingRoute && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path='/medical-records/:id' element={<SingleRecordDetails/>}></Route>
          <Route path='/screening-schedules' element={<ScreeningSchedule/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
