"use client";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { Input, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { login } from "@/components/userSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/components/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "cookies-next";
const Login = () => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();
  // state area
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isworong, setIsworong] = useState(false);
  const handlelogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "/api/login",
        {
          username: username,
          password: password,
          login: true,
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
          setIsworong(true);
        } else {
          dispatch(
            login({
              username: coc.username,
              password: coc.password,
              id: coc.id,
              token: coc.token,
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
          setCookie("user%%token", coc.token);
          router.push(`/worker/${username}`);
        }
      });
  };

  return (
    <div dir="ltr" className="w-screen h-screen">
      <div className="w-4/6 h-4/6 bg-white absolute left-0 right-0 top-0 bottom-0 mr-auto ml-auto mt-auto mb-auto rounded-3xl shadow-2xl grid grid-flow-row justify-center content-center">
        <Image
          src={Logo}
          alt="logo"
          className="w-32 bg-white shadow-lg  left-0 right-0 mr-auto ml-auto absolute -mt-10 p-5 rounded-xl"
        />
        <form
          onSubmit={(e) => handlelogin(e)}
          className="flex w-96 flex-col items-center gap-6"
        >
          <Input
            onChange={(e) => setUsername(e.target.value)}
            size="lg"
            className=""
            label="اسم المستخدم"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
            className=""
            type="password"
            label="كلمة السر"
          />
          {isworong ? (
            <label className="text-red-600">
              إسم المستخدم أو كلمة السر غير صحيحة
            </label>
          ) : null}
          <Button type="submit">تسجيل دخول</Button>
          <Button
            onClick={() => {
              router.push("/worker/sign-up");
            }}
            color="white"
          >
            تسجيل اول مره
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
