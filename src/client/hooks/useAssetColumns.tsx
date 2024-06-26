import React, {MouseEvent} from 'react'
import { BsCameraVideoFill, BsImage } from 'react-icons/bs';
import { MdAudioFile } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { DocumentAsset, AssetMedia, USER } from '../types/types';
import Tooltip from '../components/utils/Tooltip';
import useAuthData from '../contexts/AuthContext';

const useAssetColumns = (
  deleteAssetHandler: (event: MouseEvent<HTMLElement>, item: DocumentAsset) => void
) => {
  const { userInfo } = useAuthData();

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
        render: (value: string) => {
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
            <Tooltip 
              message={ userInfo?.role !== USER ?
                'Delete asset'
                : 'You are not authorized on this project to delete an asset. Please contact support.'
              }
            >
              <button
                disabled={userInfo?.role === USER}
                className={`delete_icon ${userInfo?.role !== USER? "active_delete-icon": "disabled_delete-icon"}`}
                onClick={(event) => deleteAssetHandler(event, item)}
              >
                <RiDeleteBin6Line/>
              </button>
            </Tooltip>
          )
        }
      }
    ]
  )
}

export default useAssetColumns;