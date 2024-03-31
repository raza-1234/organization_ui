import "../../css/Select.css";

import classNames from "classnames";
import { PayloadType } from "../../types/types";
import { Boolean_False, Select_Option_PlaceHolder } from "../../utils/constants";

type ParentProp = {
  payLoad?: PayloadType[];
  className?: string
  onChange: (id: string) => void
  placeholder?: string
  required?: boolean
}

const Select = (prop: ParentProp) => {

  const {
    payLoad,
    className,
    onChange,
    required = Boolean_False,
    placeholder = Select_Option_PlaceHolder
  } = prop;

  const select_input_field_classes = classNames("organization_select-option-field", className);

  return (
    <select
      required={required}
      className={select_input_field_classes}
      onChange={(e) => onChange(e.target.value)}
    >
      <option hidden>{placeholder}</option>
      {
        payLoad?.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.value}
          </option>
        ))
      }
    </select>
  )
}

export default Select;
