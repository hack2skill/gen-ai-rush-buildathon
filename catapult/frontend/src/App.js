import './App.css';
import Home from './Home/Home';
import Dashboard from './Dashboard/Dashboard';
import Interview from './Interview/Interview';
import Feedback from './Feedback/Feedback';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';


function App() {
  return (
    <Router>
      <div className='App'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/interview/:interviewId" exact element={<Interview />} />
          <Route path="/feedback/:interviewId" exact element={<Feedback />} />
        </Route>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
