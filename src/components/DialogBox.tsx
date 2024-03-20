import "../css/DialogBox.css";

import Button from "./shared/Button";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import Select from "./shared/Select";
import api from "../axios/api";
import { AxiosResponse } from "axios";

type ParentProp = {
  toggleModel: () => void
}

const DialogBox = ({toggleModel}: ParentProp) => {
  const dummyArray = [{name: "doc1"},{name: "doc1"},{name: "doc1"},{name: "doc1"}];

  const fetchDocuments = async () => {
    try {
      const response: AxiosResponse = await api.get("document/getDocument");
      if (response.statusText === "Ok"){
        console.log(response.data);
      }
    } catch (err){
      console.log("Fetchdocuments: Something went wrong.", err);
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, [])

  return (
    <div className='organization-dialogBox_wrapper'>
      <div className='organization-dialogBox_header'>
        <h3>
          select a document to view assets
        </h3>
        <RxCross1 onClick={toggleModel}/>
      </div>
      <div className='organization-dialogBox_body'>
        <form>
          <Select
            documents={dummyArray}
            type="primary"
          />
          <div className='organization-dialogBox_button-grp'>
            <Button
              value="cancel"
              clickHandler={toggleModel}
            />
            <Button
              value="done"
              clickHandler={toggleModel}
              className="done-btn"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default DialogBox
