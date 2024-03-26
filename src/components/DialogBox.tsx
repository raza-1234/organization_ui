import "../css/DialogBox.css";

import { FormEvent, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AxiosResponse } from "axios";
import api from "../axios/api";
import Button from "./utils/Button";
import { STATUS_TEXT, Document } from "../types/types";
import { useMutation, useQuery } from "react-query";
import Cookies from "js-cookie";
import toastMessage from "./utils/Toast";

type ParentProp = {
  toggleModel: () => void
}

const DialogBox = ({toggleModel}: ParentProp) => {
  const [documents, setDocuments] = useState<Document[]>();
  const [selectedDocument, setSelectedDocument] = useState("");
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

  const { isLoading, isError, data } = useQuery("organizationDocuments", fetchDocuments, {
    enabled: !!cookie,
    onSuccess: (data) => {
      setDocuments(data);
    }
  });

  const fetchAssets = async () => {
    try {
      const response = await api.get(`assets/getDocumentAssets/${selectedDocument}`);
      if (response.statusText !== STATUS_TEXT){
        return {};
      }
      return response.data?.documentAssets;
    } catch (err: any){
      console.log("Assets: Something went wrong.", err.response?.data?.message);
      throw new Error(err.response?.data?.message || "Something went wrong");
    }
  }

  const { mutate } = useMutation("Assets", fetchAssets, {
    onSuccess: (data) => {
      console.log(data);
      setSelectedDocument("");
    }
  });

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("is it workingggg");
    mutate();
  }

  return (
    <div className='organization-dialogBox_wrapper'>
      <div className='organization-dialogBox_header'>
        <h3>
          select a document to view assets
        </h3>
        <RxCross1 onClick={toggleModel}/>
      </div>
      <div className='organization-dialogBox_body'>
        <form onSubmit={submitHandler}>
          <select className = "selectDocs" value={selectedDocument} onChange={(e) => setSelectedDocument(e.target.value)}>
            <option hidden>Select Document</option>
            {
              documents?.map((document: Document) => (
                <option
                  key={document.id}
                  value={document.id}
                >
                  {document.documentName.toUpperCase()}
                </option>
              ))
            }
          </select>
          <div className='organization-dialogBox_button-grp'>
            <Button
              value="cancel"
              clickHandler={toggleModel}
            />
            <Button
              value="done"
              className="done-btn"
            />
          </div>
        </form>
      </div>
      {
        data && 
        toastMessage("successs", "Documents fetched successfully.", 5000)
      }
    </div>
  )
}

export default DialogBox
