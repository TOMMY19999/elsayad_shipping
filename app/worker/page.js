'use client'
import { Spinner } from "@material-tailwind/react";
import { selectUser } from '@/components/userSlice';
import {useSelector} from 'react-redux'
import { useRouter } from "next/navigation";

 const Worker =()=>{
    const user = useSelector(selectUser);
    const router = useRouter();
    console.log(user);
if(user === null){
    router.push('/worker/login')
}
    return(
        <div className="h-screen w-screen grid justify-center content-center">
   <div className="flex items-end gap-8">

      <Spinner className="h-32 w-32 " />
    </div>
        </div>
    )
}

export default Worker ;