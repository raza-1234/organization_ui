import "../../css/SearchableSelect.css"

import React, { useEffect, useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";

import { Payload } from "../../types/types";
import DataStates from "./DataStates";

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

const Select = (prop: ParentProp) => {

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

  const dropdownOptions = (data: Payload[]) => {
    let render: JSX.Element | JSX.Element[]

    if (data.length === 0){
      render = 
      <DataStates
        isEmpty={true}
        emptyMessage="Nothing Found"
      />
    } else {
      render =
      data.map((item: Payload) => (
        <li
          key={item.id}
          onClick={() => selectOptionHandler(item)}
          className={`select-option ${!searchAble && item.value === initialValue && "selected_option"}`}
        >
          {item.value}
        </li>
      ))
    }
    return render;
  }

  const dropdownContent = () => {
    let render: JSX.Element;

    if (loading){
      render = 
      <DataStates
        isLoading={true}
        loadingMessage="Loading ..."
      />
    } else if (error){
      render = 
      <div className="select-option error_status">
        <p>
          {error}
          <span className="retry" onClick={retryHandler}>
            Retry
          </span>
        </p>
      </div>
    } else {
      render = 
      <ul className="select-options_wrapper">
        {dropdownOptions(searchAble? filteredOptions as Payload[]: formatPayload())}
      </ul>
    }

    return render;
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
          {dropdownContent()}
        </div>
      }
    </div>
  )
}

export default Select
