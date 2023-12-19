import { NextResponse, NextRequest } from "next/server";


const sendmessage =async (number , message)=>{
  const body = {
    environment:1,
    username:'e790fab16cd1acb300a227eb3aea04febe131090c088b3b685b60dd35a60e4f2',
    password:'7cf5d3a3ee55399cff6ac6465d6b90420b2856599866de8fdea009b5b67fa3e5',
    sender:'5f3076169b18122a12a510c8badf9a56f8349da735b5cc0ba71a09b5ef9905cd',
    mobile:number,
    language:2,
    message:message,
}
return new Promise((resolve , reject)=>{
   fetch('https://smsmisr.com/api/SMS/?' ,{
    method:'POST',
    headers:{
        "Content-Type" : "application/json",
    },
    body: JSON.stringify(body)
}).then((data)=>{

data.json().then((any)=>{
  resolve(any);
})
}).catch(err => reject(err));
})

}

const response = NextResponse ; 
export async function POST(request){
    const req = await request.json();
    if (request.method === 'POST') {
      const newdata  = await sendmessage(req.mobile , req.message) ;

      return response.json({body : newdata})
    }
    

}
