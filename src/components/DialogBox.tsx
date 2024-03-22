import "../css/DialogBox.css";

import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AxiosResponse } from "axios";
import Select from "./utils/Select";
import api from "../axios/api";
import Button from "./utils/Button";
import { STATUS_TEXT, Document } from "../types/types";
import { useQuery } from "react-query";
import Cookies from "js-cookie";

type ParentProp = {
  toggleModel: () => void
}

const DialogBox = ({toggleModel}: ParentProp) => {
  const [documents, setDocuments] = useState<Document[]>();
  const cookie = Cookies.get("session_id");
  
  const fetchDocuments = async () => {
    try {
      const response: AxiosResponse = await api.get("document/getDocument");
      if (response.statusText !== STATUS_TEXT){
        return {};
      }      
      return response.data.documentData;
    } catch (err){
      console.log("Fetchdocuments: Something went wrong.", err);
    }
  }

  const { isLoading, isError } = useQuery("organizationDocuments", fetchDocuments, {
    enabled: !!cookie,
    onSuccess: (data) => {
      setDocuments(data);
    }
  });

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
            documents={documents}
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
