import api from "../axios/api";

const Logout = async () => {
  try {
    await api.get("logout");
  } catch (err: any){
    console.log("Logout: something went wrong", err);
    throw new Error("Logout: Something went wrong.")
  }
}

export default Logout;