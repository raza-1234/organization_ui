import React from 'react'
import { BsCameraVideoFill, BsImage } from 'react-icons/bs';
import { MdAudioFile } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { DocumentAssetType, AssetMedia } from '../types/types';

const useAssetColumns = () => {
  return (
    [
      {
        header: "",
        key: "image",
        field: "image",
        width: "10%",
        sort: false,
        render: (value: string, item: DocumentAssetType) => {
          const Url = item.url.slice(item.url.indexOf("Assets"));
          let children: JSX.Element;
  
          if (item.type === AssetMedia.IMAGE){
            children = <img src={require(`../${Url}`)} alt="asset" className = "organization_assets-media"/>
          } else if (item.type === AssetMedia.VIDEO){
            children = <BsCameraVideoFill className = "organization_assets-media"/>
          } else if (item.type === AssetMedia.AUDIO){
            children = <MdAudioFile className = "organization_assets-media"/>
          } else{
            children = <></>
          }
          return children
        }
      },  
      {
        header: "FileName",
        width: "25%",
        key: "title",
        field: "title",
        sort: true
      },
      {
        header: "Date Last Updated",
        key: "date",
        field: "date",
        className: "date",
        width: "30%",
        sort: true,
        render: (value: string, item: DocumentAssetType) => {
          return (
            <div className="date">
              {value}
            </div>
          )
        }
      },
      {
        header: "Type",
        key: "type",
        field: "type",
        width: "25%",
        sort: true,
        render: (value: string, item: DocumentAssetType) => {
          const fileExtension = item.url.slice(item.url.indexOf(".") + 1).toUpperCase();
          let children: JSX.Element;
          if (item.type === AssetMedia.IMAGE){
            children = <BsImage className="organization_assets-media"/>
          } else if (item.type === AssetMedia.VIDEO){
            children = <BsCameraVideoFill className="organization_assets-media"/>
          } else if (item.type === AssetMedia.AUDIO){
            children = <MdAudioFile className="organization_assets-media"/>          
          } else{
            children = <></>
          }
          return (
            <div className="asset-type_column">
              {children}
              {fileExtension}
            </div>
          )
        }
      },
      {
        header: "",
        key: "action",
        field: "deleteIcon",
        width: "10%",
        sort: false,
        render: (value: string, item: DocumentAssetType) => (
          <RiDeleteBin6Line className="action-column_delete-icon" onClick={(event) => {
            event.stopPropagation();
            console.log("item presssing del button");
          }}/>
        )
      }
    ]
  )
}

export default useAssetColumns;