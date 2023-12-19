"use client";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { Input, Button, Checkbox } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Welcome from "../../../assets/welcome.svg";
import { motion } from "framer-motion";

const Login = () => {
  const router = useRouter();
  // state area
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isworong, setIsworong] = useState(true);
  const [wrongpass, setWorongpas] = useState(false);
  const [sheaper, setSheaper] = useState(false);
  const [worker, setWorker] = useState(false);
  const [dilver, setDilver] = useState(false);
  const [phonenumber, setPhonenumber] = useState("");
  const [regestired, setResgestired] = useState(false);
  const [exist, setExist] = useState(false);
  useEffect(() => {
    if (username !== "" && name !== "" && password !== "" && confirm !== "") {
      if (password !== confirm) {
        setIsworong(true);
        setWorongpas(true);
      } else if (password === confirm) {
        setWorongpas(false);
        setIsworong(false);
      }
    }
  }, [confirm]);

  const handlesignup = async (e) => {
    e.preventDefault();
    const notphonenumber = phonenumber.startsWith("2");

    if (!sheaper && !dilver && !worker) {
      window.alert("ممكن سيادتك تختار هتشتغل ايه 🧐");
    } else if (
      notphonenumber ||
      phonenumber.length > 11 ||
      !phonenumber.startsWith("01")
    ) {
      window.alert(
        "  يافتاح يا عليم يا رزاق يا كريم اكتب رقم التليفون عدل يبني انت مش ناقصاك عالصبح"
      );
    } else {
      await axios
        .post("/api/newuser", {
          username: username,
          password: password,
          is_shipper: sheaper ? 1 : 0,
          is_deliver: dilver ? 1 : 0,
          phonenumber: phonenumber,
          name: name,
          worker: worker ? 1 : 0,
        })
        .then((res) => {
          if (res.data.regestired === true) {
            setResgestired(true);
          } else if (res.data.regestired === false) {
            setExist(true);
          }
        });
    }
  };
  if (!regestired) {
    return (
      <div dir="ltr" className="w-screen h-screen">
        <div className="w-5/6 h-5/6 bg-white absolute left-0 right-0 top-0 bottom-0 mr-auto ml-auto mt-auto mb-auto rounded-3xl shadow-2xl grid grid-flow-row justify-center content-center">
          <Image
            src={Logo}
            alt="logo"
            className="w-32 bg-white shadow-lg  left-0 right-0 mr-auto ml-auto absolute -mt-10 p-5 rounded-xl"
          />
          <form
            onSubmit={(e) => handlesignup(e)}
            className="flex w-96 flex-col items-center gap-6"
          >
            <div className=" grid grid-cols-2 gap-10 ">
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                size="lg"
                className=""
                label="اسم المستخدم بالانجليزية"
              />
              <Input
                onChange={(e) => setName(e.target.value)}
                size="lg"
                className=""
                label="الاسم بالعربي"
              />
              <Input
                value={phonenumber}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    setPhonenumber("");
                  } else {
                    setPhonenumber(e.target.value);
                  }
                }}
                size="lg"
                className=""
                label="رقم الهاتف"
              />
              <Input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                size="lg"
                className=""
                type="password"
                label="كلمة السر"
              />
              <Input
                onChange={(e) => {
                  setConfirm(e.target.value);
                }}
                size="lg"
                className=""
                type="password"
                label="إعادة إدخال كلمة السر "
              />

              <div className="    gap-32  ">
                <Checkbox
                  checked={sheaper}
                  onChange={(e) => {
                    setSheaper(true);
                    setWorker(false);
                    setDilver(false);
                  }}
                  label="مسئول شحن "
                />
                <Checkbox
                  checked={worker}
                  onChange={(e) => {
                    setSheaper(false);
                    setWorker(true);
                    setDilver(false);
                  }}
                  label="مسئول الطلبات"
                />
                <Checkbox
                  checked={dilver}
                  onChange={(e) => {
                    setSheaper(false);
                    setWorker(false);
                    setDilver(true);
                  }}
                  label="طيار"
                />
              </div>
            </div>
            <Button
              disabled={isworong}
              color={wrongpass ? "red" : null}
              type="submit"
            >
              {wrongpass
                ? " 😂 كلمة السر غلط فوق احنا لسا في اولها"
                : "انضم للصياد"}
            </Button>

            <Button
              onClick={() => {
                router.push("/worker/login");
              }}
              color="white"
            >
              لدي حساب اود تسجيل الدخول
            </Button>
            {exist ? (
              <h1 dir="rtl" className="text-xl text-center  text-red-600">
                رقم الهاتف او اسم المستخدم موجودين قبل كدا شكلك فاضي وجاي تقرفنا
              </h1>
            ) : null}
          </form>
        </div>
      </div>
    );
  } else if (regestired) {
    return (
      <div dir="ltr" className="w-screen h-screen">
        <div className="w-4/6 h-4/6 bg-white absolute left-0 right-0 top-0 bottom-0 mr-auto ml-auto mt-auto mb-auto rounded-3xl shadow-2xl grid grid-flow-row gap-20 justify-center content-center">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            style={{ x: 100 }}
          >
            <Image src={Welcome} alt="welcome" className="" />
          </motion.div>
          <Button
            onClick={() => {
              router.push("/worker/login");
            }}
            color="white"
          >
            تسجيل الدخول
          </Button>
        </div>
      </div>
    );
  }
};

export default Login;
