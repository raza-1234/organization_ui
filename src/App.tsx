import './App.css';

import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PrivateRoutes from './components/PrivateRoutes';
import AssetDashboard from './components/AssetDashboard';
import Missing from './components/Missing';

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
