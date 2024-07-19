import axios from "axios"
var serverURL="https://restaurant-backend-1-5tlk.onrender.com"
 
const getData=async(url)=>{
    try{
        var response=await axios.get(`${serverURL}/${url}`)
        var result=await response.data
        return result


    }
    catch(e){
        console.log(e)
        return(null)
    }
}

const postData=async(url,body)=>{
    try{
        var response=await axios.post(`${serverURL}/${url}`,body)
        var result=await response.data
        return result
      


    }
    catch(e){
        console.log(e)
        return(null)
    }
}
export{serverURL, getData, postData}
