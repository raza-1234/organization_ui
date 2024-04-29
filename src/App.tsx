import './App.css';

import { Routes, Route } from 'react-router-dom';
import Login from './client/components/Login';
import Header from './client/components/Header';
import Dashboard from './client/components/Dashboard';
import PrivateRoutes from './client/components/PrivateRoutes';
import AssetDashboard from './client/components/AssetDashboard';
import Missing from './client/components/Missing';

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route element={<PrivateRoutes/>}>
          <Route path='/asset-library/:documentID?' element={<AssetDashboard/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route path='*' element={<Missing/>}/>
      </Routes>
    </div>
  );
}

export default App;
