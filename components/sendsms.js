// Send sms

import axios from "axios"


export const SendSMS = async(mobile , message)=>{
 
    const body = {
        mobile:`2${mobile}`,
        message:message,
    }
return await axios.post('/api/sendsms' , body , {
    headers:{
        "Content-Type" : "application/json",
    },
})
  
}
