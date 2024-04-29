import { useMutation, useQueryClient } from "react-query";

import api from "../axios/api";
import { STATUS_TEXT } from "../types/types";

const deleteAsset = async (assetId?: string) => {

  if (!assetId){
    return null;
  }
  
  try {
    const response = await api.delete(`assets/deleteAsset/${assetId}`);

    if (response?.statusText !== STATUS_TEXT){
      throw new Error("Error while fetching assets");
    }    
    
    return response.data;
  } catch (err){
    console.log("Assets: Something went wrong.", err);
    throw new Error("Error while fetching assets");
  }
}

export const useDeleteAsset  = (
  toastHandler: (message: string, variant: string, timeOut?: number) => void
) => {
  const queryClient = useQueryClient();

  return useMutation(deleteAsset, {
    retry: 3,
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAssets");
    },
    onError: () => {
      toastHandler("Error while deleting asset. Please try again.", "error")
    }
  })
}