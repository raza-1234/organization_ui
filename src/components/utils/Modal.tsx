import "../../css/Modal.css";

import { RxCross1 } from "react-icons/rx";
import Button from "./Button";
import { useState } from "react";
import classNames from "classnames";
import { ModalButtonText, Boolean_True, Boolean_False, ModalTitle } from "../../utils/constants";
import Loader from "./Loader";

type ParentProp = {
  title?: string;
  component?: JSX.Element;
  onClose?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
  okButtonText?: string;
  cancelButtonText?: string;
  footer?: boolean;
  crossIconClassName?: string;
  buttonPosition?: string;
  closeOnBgClick?: boolean;
}

const Modal = (prop: ParentProp) => {

  const {
    title = ModalTitle,
    component,
    onClose,
    onOk,
    onCancel,
    okButtonText = ModalButtonText.OK,
    cancelButtonText = ModalButtonText.CANCEL,
    footer = Boolean_True,
    crossIconClassName,
    buttonPosition,
    closeOnBgClick = Boolean_True,
  } = prop;

  const [isShowModal, setIsShowModal] = useState(Boolean_True);
  const modal_button_group_classes = classNames("modal_button-grp", buttonPosition?.toLowerCase());

  const closeModal = () => {
    setIsShowModal(!isShowModal);
  }

  const handleOk = () => {
    onOk && onOk();
    closeModal();
  }

  const handleCancel = () => {
    onCancel && onCancel();
    closeModal();
  }

  const handleClose = () => {
    onClose && onClose();
    closeModal();
  }

  return (
    <>
    {
      isShowModal &&
      <div className= "modal_wrapper">
        <div className='modal_content'>
          <header className='modal_header'>
            <h3>
              {title}
            </h3>
            <RxCross1
              className={crossIconClassName}
              onClick={handleClose}
            />
          </header>
          <div className='modal_body'>
            {component}
          </div>  
          {
            footer && 
            <footer className={modal_button_group_classes}>
            <Button
              value={cancelButtonText}
              variant="secondary"
              clickHandler={handleCancel}
            />
            <Button
              value={okButtonText}
              clickHandler={handleOk}
              className="ok_button"
            />
          </footer>
          }
        </div>
        <div className="modal_screen-wrapper" onClick={() => closeOnBgClick && closeModal()}/>
      </div>
    }
    </>
  )
}

export default Modal
