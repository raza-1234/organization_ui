import { AxiosResponse } from "axios";
import api from "../axios/api";

const Logout = async () => {
  try {
    const response: AxiosResponse = await api.get("logout");
    return response;
  } catch (err: any){
    console.log("Logout: something went wrong", err);
    throw new Error("Logout: Something went wrong.")
  }
}

export default Logout;