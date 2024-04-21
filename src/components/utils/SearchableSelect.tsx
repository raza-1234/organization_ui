import "../../css/SearchableSelect.css"

import React, { useEffect, useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";

import { PayloadType } from "../../types/types";
import { Boolean_True } from "../../utils/constants";
import Loader from "./Loader";

type ParentProp = {
  payLoad?: any;
  loading?: boolean;
  error?: string;
  onChange: (id: string) => void;
  placeholder?: string;
  initialValue?: string;
  retryHandler?: () => void;
  searchAble?: boolean
}

const SearchableSelecet = (prop: ParentProp) => {

  const {
    payLoad,
    loading,
    error,
    onChange,
    placeholder,
    initialValue,
    retryHandler,
    searchAble = Boolean_True
  } = prop;  

  const [isDropdown, setIsDropDown] = useState(false);
  const [search, setSearch] = useState(initialValue ? initialValue: "");
  const [filteredOptions, setFilteredOption] = useState<PayloadType[]>();

  useEffect(() => {
    if (searchAble){
      const data = formatPayload();
      const filteredResult = data.filter((item) => item.value?.includes(search.toLowerCase()));
      setFilteredOption(filteredResult);
    }
  }, [search, payLoad])

  useEffect(() => { //not sure is this approach ok or not.
    if (initialValue?.trim()){
      setSearch(initialValue)
    }
  }, [initialValue])

  const closeDropDown = () => {
    setIsDropDown(false);
  }

  const onChangeInput = (value: string) => {
    setSearch(value);
    setIsDropDown(true)
  }

  const formatPayload = () => {
    const data: PayloadType[] = [];
    for (let i = 0; i < payLoad?.length; i++){
      data.push({
        id: payLoad[i].id,
        value: payLoad[i].value
      })
    }
    return data;
  }

  const selectOptionHandler = (item: PayloadType) => {
    onChange(item.id.toString());
    setSearch(item.value);
    closeDropDown()
  }

  return (
    <div className="select_wrapper">
      <div className="select_input_wrapper">
        <input
          type="text"
          onChange = {(e) => onChangeInput(e.target.value)}
          placeholder = {placeholder}
          value={search}
          readOnly = {!searchAble}
        />
        <RiArrowDropDownLine 
          tabIndex={0}
          onBlur={() => setTimeout(closeDropDown, 100)} 
          onClick = {() => setIsDropDown(!isDropdown)} 
          className="dropdown_icon"
        />
      </div>
      {
        isDropdown && 
        <div className="dropdown">
          {
            loading ?
            <div className="select-option">
              <Loader/>
              Loading ...
            </div>
            : !loading && error ? 
            <div className="select-option error_status">
              <p>
                {error}
                <span className="retry" onClick={retryHandler}>
                  Retry
                </span>
              </p>
            </div>
            :<ul className="select-options_wrapper">
              {
                searchAble ? 
                <>
                  {
                    filteredOptions?.length !== 0 ?
                    filteredOptions?.map((item: PayloadType) => (
                      <li key={item.id} onClick={() => selectOptionHandler(item)} className="select-option">
                        {item.value}
                      </li>
                    ))
                    :<div className="select-option">
                      No Match
                    </div>
                  }
                </>
                :
                <>
                  {
                    formatPayload().map((item: PayloadType) => (
                      <li 
                        key={item.id} 
                        onClick={() => selectOptionHandler(item)} 
                        className={`select-option ${item.value === initialValue && "selected_option"}`}
                      >
                        {item.value}
                      </li>
                    ))
                  }
                </>
              }
            </ul>
          }
        </div>
      }
    </div>
  )
}

export default SearchableSelecet
