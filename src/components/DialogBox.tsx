import "../css/DialogBox.css";

import { RxCross1 } from "react-icons/rx";
import Button from "./utils/Button";
import { FormEvent } from "react";

const headerText = "header text";

type ParentProp = {
  title?: string;
  toggleModel: () => void;
  component?: JSX.Element
  submitHandler: (event: FormEvent<HTMLFormElement>) => void
  // submitButtonText: string;
  // cancelButtonText: string;
  // submitButtonClassName: string;
  // cancelButtonClassName: string;
  // submitButtonHandler: string;
  // cancelButtonHandler: string;
}

const DialogBox = ({title = headerText, toggleModel, component, submitHandler}: ParentProp) => {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitHandler(event);
    toggleModel();
  }

  return (
    <div className='organization-dialogBox_wrapper'>
      <div className='organization-dialogBox_header'>
        <h3>
          {title}
        </h3>
        <RxCross1 onClick={toggleModel}/>
      </div>
      <div className='organization-dialogBox_body'>
        <form onSubmit={handleSubmit}>
          <div className = "organization-form_input-field">
            {component}
          </div>
          <div className='organization-dialogBox_button-grp'>
            <Button
              value="cancel"
              variant="secondary"
              clickHandler={toggleModel}
            />
            <Button
              value="done"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default DialogBox
