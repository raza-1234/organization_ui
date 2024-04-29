import "../css/Missing.css";

import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <div className='bloowatch-404'>
      <h1>404</h1>
      <h3>page not found.</h3> 
      <Link to='/'><p>go to our website.</p></Link>
    </div>
  )
}

export default Missing