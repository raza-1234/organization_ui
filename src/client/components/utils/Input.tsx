import "../../css/Input.css";

import classNames from 'classnames';
import { INPUT_TYPE } from "../../utils/constants";

type ParentProp = {
  type?: string;
  value?: string | number;
  required?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: JSX.Element;
  className?: string
}

const Input = (prop: ParentProp) => {
  const {
    type = INPUT_TYPE,
    onChange,
    value,
    required,
    placeholder,
    icon,
    className
  } = prop;

  const input_classes = classNames({
    "input": true,
    "icon": icon,
    "no_icon": !icon
  });

  return (
    <div className="input_wrapper">
      <div className="icon_wrapper">
        {icon}
      </div>
      <input
        className={`${input_classes} ${className}`}
        required ={required}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || `enter ${type}`}
        value={value}
      />
    </div>

  )
}

export default Input
