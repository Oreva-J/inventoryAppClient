import axios from "axios"
import { toast } from "react-toastify"

const Backend_url = "http://localhost:3333/api/users/"

export const checkMail = (email)=>{
    return email.match(/^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/)
}


export const registerUser = async (userData)=>{
    try {
        const response = await axios.post(`${Backend_url}register`, userData, {withCredentials: true})
        if(response.statusText === "OK"){
            toast.success("Registered Successfuly")
        }
        
        return response.data
    } catch (error) {
        const message = 
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.error("could not post", message)
        toast.error(message)
    }
}

// Login user

export const loginUser = async (userData)=>{ 
    try {
        const response = await axios.post(`${Backend_url}/login`, userData, {withCredentials: true})
        if(response.statusText === "OK"){
            toast.success("suucess")
        }
    
        return response.data
        
    } catch (error) {
        const message = 
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.error("could not Login", message)
        toast.error(message)
    }
   
}

export const getUser = async ()=>{
    try {
        const response = await axios.get(`${Backend_url}getuser`, {withCredentials: true})
        if (response.status === 200) {
            return response.data; // Return the data if successful
          } 

    } catch (error) {
        const message = 
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.error("could not fetch User", message)
        toast.error(message)
    }
}
export const updateUser = async (editedData)=>{
    try {
        
        const response = await axios.patch(`${Backend_url}updateuser`, editedData, {withCredentials: true})
        if (response.status === 200) {
            toast.success("updated")
            return response.data; // Return the data if successful
          } 

    } catch (error) {
        const message = 
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.error("could not fetch User", message)
        toast.error(message)
    }
}



export const logoutUser = async  ()=>{
    try {
        const response = await axios.get(`${Backend_url}logout`, {withCredentials: true})
        if (response.statusText === "OK") {
            toast.success("LoggedOut")
        }
        return response.data

    } catch (error) {
        const message = 
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.error("could not Logout", message)
        toast.error(message)
    }

}

export const isUserLogin = async () => {
    try {
      const response = await axios.get(`${Backend_url}/loggedin`, {withCredentials: true});
  
      // Check if the response status is 200 (OK)
      if (response.status === 200) {
        return response.data; // Return the data if successful
      } else {
        // Handle non-200 status codes if necessary
        toast.error('Failed to check login status');
        return null; // Return null if the status is not OK
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      console.error('Could not fetch user login status:', message);
      toast.error(message); // Show the error message in a toast
      return null; // Return null in case of an error
    }
  };

//   Forgot Password

export const forgotPassword = async (email)=>{
    try {
        console.log(email);
        if(!email){
            return toast.error("please enter Email Address")
        }
        await axios.post(`${Backend_url}/forgotpassword`, {email}, {withCredentials: true} )
        toast.success("Success! Please cheack your mail")
        
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      console.error('Something Went Wrong:', message);
      toast.error(message); // Show the error message in a toast
      return null; // Return null in case of an error
    }
}