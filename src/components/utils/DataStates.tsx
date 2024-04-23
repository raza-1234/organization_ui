import "../../css/DataStates.css";

import React, {Fragment} from 'react';

import Loader from './Loader';
import Button from './Button';

type ParentProp = {
  isLoading?: boolean,
  isError?: boolean,
  isEmpty?: boolean, 
  loadingMessage?: string,
  errorMessage?: string,
  emptyMessage?: string,
  showButton?: boolean, 
  retryFunction?: () => void,
  buttonText?: string
}

const DataStates = (props: ParentProp) => {
  const {isLoading, isError, isEmpty, errorMessage, emptyMessage, loadingMessage, showButton, retryFunction, buttonText} = props;

  let render = <Fragment/>;

  if (isLoading){
    render = 
    <Fragment>
      <h4 className="information_state">{loadingMessage || 'Loding ...'}</h4>
      <Loader/>
    </Fragment>
  }

  else if (isError){
    render = 
    <Fragment>
      <h4 className="error_state">{errorMessage}</h4>
      <Button
        value={buttonText}
        clickHandler={retryFunction} 
      />
    </Fragment>
  }

  else if (isEmpty){
    render = 
    <Fragment>
      <h4 className="information_state">{emptyMessage}</h4>
      {
        showButton && <Button value={buttonText} clickHandler={retryFunction}/>
      }
    </Fragment>
  }

  return (
    <div className="data-states_wrapper">
      {render}
    </div>
  )
}

export default DataStates
