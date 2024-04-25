import React from 'react'
import { BsCameraVideoFill, BsImage } from 'react-icons/bs';
import { MdAudioFile } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { DocumentAsset, AssetMedia } from '../types/types';
import Tooltip from '../components/utils/Tooltip';

const useAssetColumns = () => {

  return (
    [
      {
        header: "",
        key: "image",
        field: "image",
        width: "10%",
        sort: false,
        render: (value: string, item: DocumentAsset) => {
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
        render: (value: string, item: DocumentAsset) => {
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
        render: (value: string, item: DocumentAsset) => {
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
        render: (value: string, item: DocumentAsset) => {
          return (
            <Tooltip message='You are not authorized on this project to delete an asset. Please contact support.'>
              <RiDeleteBin6Line className="action-column_delete-icon" 
                onClick={(event) => {
                  event.stopPropagation();
                  console.log("item presssing del button");
                }}
              />
            </Tooltip>
          )
        }
      }
    ]
  )
}

export default useAssetColumns;