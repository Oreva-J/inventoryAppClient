import axios from "axios"
import { toast } from "react-toastify"

const Backend_url = "https://bvent-api.onrender.com"
export const registerUser = async (userData)=>{
    try {
        const response = await axios.post(`${Backend_url}/api/users/register`, userData, {withCredentials: true})
        if(response === "OK"){
            toast.success("Registered Successfuly")
        }
        return response.data
    } catch (error) {
        console.error("could not post", error.message, error)
        toast.error(error)
    }
}