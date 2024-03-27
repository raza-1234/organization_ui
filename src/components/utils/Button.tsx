import "../../css/Button.css";
import { ButtonVariant } from "../../utils/constants";

type ParentProp = {
  value?: string;
  clickHandler?: () => void;
  variant?: string;
}

const Button = ({variant = ButtonVariant.PRIMARY, value, clickHandler}: ParentProp) => {

  const formatVariant = variant?.toLowerCase();
  let variantType;

  if (formatVariant !== ButtonVariant.PRIMARY && formatVariant !== ButtonVariant.SECONDARY){
    variantType = ButtonVariant.PRIMARY;
  } else {
    variantType = formatVariant
  }

  return (
    <button
      className={`custom-button ${variantType}`}
      onClick={clickHandler}
    >
      {value || variantType}
    </button>
  )
}

export default Button

