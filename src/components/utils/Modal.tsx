import "../../css/Modal.css";

import { RxCross1 } from "react-icons/rx";
import Button from "./Button";
import { useState } from "react";
import classNames from "classnames";
import { ModalButtonText, ModalTitle } from "../../utils/constants";

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
  closeButton?: boolean;
  okButtonClassName?: string;
  cancelButtonClassName?: string;
  modalContentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
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
    footer = true,
    crossIconClassName,
    buttonPosition,
    closeOnBgClick = true,
    closeButton = true,
    footerClassName,
    okButtonClassName,
    cancelButtonClassName,
    headerClassName,
    bodyClassName,
    modalContentClassName
  } = prop;

  const [isShowModal, setIsShowModal] = useState(true);
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
        <div className={`modal_content ${modalContentClassName && modalContentClassName}`}>
          <header className={`modal_header ${headerClassName && headerClassName}`}>
            <h3>
              {title}
            </h3>
            {closeButton && 
              <RxCross1
                className={crossIconClassName}
                onClick={handleClose}
              />
            }
          </header>
          <div className={`modal_body ${bodyClassName && bodyClassName}`}>
            {component}
          </div>  
          {
            footer && 
            <footer className={`${modal_button_group_classes} ${footerClassName && footerClassName}`}>
            <Button
              value={cancelButtonText}
              variant="secondary"
              clickHandler={handleCancel}
              className={cancelButtonClassName}
            />
            <Button
              value={okButtonText}
              clickHandler={handleOk}
              className={okButtonClassName}
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
