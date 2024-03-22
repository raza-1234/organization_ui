import './App.css';

import { Routes, Route, useActionData } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PrivateRoutes from './components/utils/PrivateRoutes';
import Asset from './components/Asset';
import UseAuthData from './contexts/authContext';

function App() {

  const { userInfo } = UseAuthData();

  return (
    <div className="App">
      {
        userInfo?.email && 
        <Header/>
      }
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route element={<PrivateRoutes/>}>
          <Route path='/asset-library' element = {<Asset/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
