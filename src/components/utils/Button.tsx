import "../../css/Button.css";
import classNames from "classnames";
import { ButtonVariant, ButtonType, DefaultButtonType } from "../../utils/constants";

type ParentProp = {
  value?: string;
  clickHandler?: () => void;
  variant?: string;
  type?: ButtonType
  className?: string
}

const Button = (prop: ParentProp) => {

  const {
    variant = ButtonVariant.PRIMARY,
    value,
    clickHandler,
    type = DefaultButtonType,
    className
  } = prop;

  const formatVariant = variant?.toLowerCase();
  let variantType;

  if (formatVariant !== ButtonVariant.PRIMARY && formatVariant !== ButtonVariant.SECONDARY){
    variantType = ButtonVariant.PRIMARY;
  } else {
    variantType = formatVariant
  }

  const button_classes = classNames("custom-button", variantType, className);

  return (
    <button
      className={button_classes}
      onClick={clickHandler}
      type={type}
    >
      {value || variantType}
    </button>
  )
}

export default Button

