import './App.css';
import Header from './components/Header';
import { Routes, Route } from "react-router-dom";

import Asset from './components/Asset';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/asset-library' element = {<Asset/>}/>
      </Routes>
    </div>
  );
}

export default App;
