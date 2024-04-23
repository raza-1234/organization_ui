import "../../css/SearchableSelect.css"

import React, { useEffect, useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";

import { Payload } from "../../types/types";
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
    searchAble = true
  } = prop;  

  const [isDropdown, setIsDropDown] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOption] = useState<Payload[]>();

  useEffect(() => {
    if (initialValue && !isDropdown && !search.trim()){
      setSearch(initialValue)
    }
    if (searchAble){
      const data = formatPayload();
      const filteredResult = data.filter((item) => item.value?.includes(search.toLowerCase()));
      setFilteredOption(filteredResult);
    } 
  }, [search, payLoad, isDropdown])

  const closeDropDown = () => {
    setIsDropDown(false);
  }

  const onChangeInput = (value: string) => {
    setSearch(value);
    setIsDropDown(true);
  }

  const formatPayload = () => {
    const data: Payload[] = [];
    for (let i = 0; i < payLoad?.length; i++){
      data.push({
        id: payLoad[i].id,
        value: payLoad[i].value
      })
    }
    return data;
  }

  const selectOptionHandler = (item: Payload) => {
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
                    filteredOptions?.map((item: Payload) => (
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
                    formatPayload().map((item: Payload) => (
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
