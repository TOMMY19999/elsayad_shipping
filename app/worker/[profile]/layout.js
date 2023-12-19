"use client";
import { login, logout, selectUser } from "../../../components/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { WorkerSidebar } from "../../../components/sidebar";
import { useEffect } from "react";
import axios from "axios";
import { getCookie, deleteCookie, hasCookie } from "cookies-next";
import { Spinner } from "@material-tailwind/react";
import { SendSMS } from "../../../components/sendsms";

const ProfileRoot = ({ children }) => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const checkauth = async () => {
    const token = getCookie("user%%token");
    if (hasCookie("user%%token")) {
      await axios
        .post(
          "/api/login",
          {
            token: token,
            checkauth: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => {
          const coc = data.data.body[0];
          if (coc === undefined) {
            dispatch(logout);
            deleteCookie("user%%token");
            router.push("/worker/login");
          } else {
            dispatch(
              login({
                username: coc.username,
                password: coc.password,
                token: coc.token,
                id: coc.id,
                isphoto: coc.isphoto,
                authraized: coc.authraized,
                is_shipper: Number(coc.is_shipper),
                is_deliver: Number(coc.is_deliver),
                is_admin: Number(coc.is_admin),
                is_worker: Number(coc.worker),
                name: coc.name,
                phone: coc.phonenumber,
                pptype: coc.pptype,
              })
            );
          }
        });
    }
  };
  // send sms
  // const sendnewsms = async()=>{
  //   await  SendSMS('01157707886' , 'بحبك ثالث').then((data)=>{
  //     console.log(data.data);
  //   })

  // }
  // end of check

  useEffect(() => {
    checkauth();
    if (!hasCookie("user%%token")) {
      router.push("/worker/tommy");
    }
  }, []);

  return (
    <div className="w-screen h-screen flex ">
      {user === null ? null : user.authraized === 1 ? (
        <div className="sidebar">
          <WorkerSidebar />
        </div>
      ) : null}
      {user === null ? (
        <Spinner className="w-20 h-20 absolute  left-0 right-0 top-0 bottom-0 mt-auto mb-auto ml-auto mr-auto " />
      ) : user.authraized === 1 ? (
        <div className="bodyworker">{children}</div>
      ) : (
        <h1 className=" text-2xl text-center mt-20">
          ليس لديك صلاحية الوصول برجاء الرجعوع للمدير
        </h1>
      )}
    </div>
  );
};
export default ProfileRoot;
