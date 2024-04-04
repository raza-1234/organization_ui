import React from 'react'
import { BsCameraVideoFill, BsImage } from 'react-icons/bs';
import { MdAudioFile, MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { DocumentAssetType, AssetMedia } from '../types/types';

const useAssetColumns = () => {
  return (
    [
      {
        header: "",
        key: "image",
        field: "image",
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
        header: 
        <div className='column_wrapper'>
          FileName
          <span className='sort_data_icons'>
            <MdOutlineKeyboardArrowUp />
            <MdOutlineKeyboardArrowDown/>
          </span>
        </div>,
        key: "title",
        field: "title"  
      },
      {
        header: "Date Last Updated",
        key: "date",
        field: "date",
        className: "date",
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
            <div className="asset_type_column">
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
        render: (value: string, item: DocumentAssetType) => (
          <RiDeleteBin6Line className="delete_icon" onClick={(event) => {
            event.stopPropagation();
            console.log("item presssing del button");
          }}/>
        )
      }
    ]
  )
}

export default useAssetColumns;