"use client";
import Image from "next/image";
import { selectUser } from "../../../../components/userSlice";
import { useSelector } from "react-redux";
import { UploadFiles } from "../../../../components/filesuploader";
import { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";

const Profile = () => {
  const user = useSelector(selectUser);
  const [files, setFiles] = useState(null);
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [oldpass, setOldpass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [resmessage, setResmessage] = useState("");
  const [wrongpass, setWrongpass] = useState(false);
  const [thumbnail, setThumbnail] = useState(undefined);
  const router = useRouter();
  const imgsrc =
    user.isphoto === 1
      ? `/images/profiles/${user.id}${
          user.pptype === "image/png"
            ? ".png"
            : user.pptype === "image/jpeg"
            ? ".jpg"
            : ".jpg"
        }`
      : `/images/profiles/avatar.png`;
  //  delete profile photo
  const deletepic = async () => {
    const formData = new FormData();
    formData.append("delete", true);
    formData.append("id", user.id);
    await axios
      .post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data ",
        },
      })
      .then((res) => {
        setResmessage("تم حذف الصورة بنجاح");
        setTimeout(() => {
          window.location.reload(false);
        }, 200);
      });
  };
  // upadate Profile
  const upadatePrfoile = async (e) => {
    e.preventDefault();
    if (oldpass === "" && newpass === "") {
      await axios
        .post(`/api/updateprofile/${user.id}`, {
          name: name,
          phonenumber: phonenumber,
        })
        .then(async () => {
          setResmessage("تم تحديث البيانات");
          if (files !== null) {
            await UploadFiles(files, user, "proilepic");
            setResmessage("تم تحديث الصورة بنجاح");
            window.location.reload(false);
          }
          window.location.reload(false);
        });
    } else {
      if (oldpass !== user.password) {
        setWrongpass(true);
        setResmessage("الباسورد غلط يا ريس اصحى شوية الله يباركلك");
        return;
      }
      await axios
        .post(`/api/updateprofile/${user.id}`, {
          name: name,
          phonenumber: phonenumber,
          oldpass: oldpass,
          newpass: newpass,
        })
        .then(async () => {
          setResmessage("تم تحديث البيانات");
          if (files !== null) {
            await UploadFiles(files, user, "proilepic");
            setResmessage("تم تحديث الصورة بنجاح");
            window.location.reload(false);
          }
          window.location.reload(false);
        });
    }
  };
  // set valus
  useEffect(() => {
    setName(user.name);
    setPhonenumber(user.phone);
  }, []);

  return (
    <div className=" grid  w-full h-full  justify-center content-center  ">
      <div className="h-fit ">
        <form
          onSubmit={(e) => {
            upadatePrfoile(e);
          }}
          className=" grid  gap-5 profile  shadow-2xl p-10 rounded-lg  "
        >
          {resmessage === "" ? null : (
            <h1
              className={
                wrongpass
                  ? "fixed place-self-center top-0 text-red-500 text-4xl"
                  : "fixed place-self-center top-0 text-green-500 text-4xl"
              }
            >
              {resmessage}
            </h1>
          )}

          <div dir="ltr" className="grid grid-flow-col  align-middle h-2 w-30">
            <MdDelete
              onClick={deletepic}
              className="text-black  text-5xl cursor-pointer place-self-center "
            />
            <label className="text-3xl">يمكنك مسح الصورة الشخصية من هنا </label>
          </div>
          <div className="shrink-0  absolute -mt-20 -mr-20">
            <Image
              src={imgsrc}
              alt="Current profile photo"
              priority={true}
              width={60}
              height={60}
              className="h-16 w-16 object-cover rounded-full "
            />
          </div>

          <div className="flex items-center justify-center ">
            {thumbnail === undefined ? null : (
              <Image
                src={thumbnail}
                alt="thumbnail"
                height={40}
                width={40}
                className=" fixed place-self-start -mt-16 rounded-3xl w-20 h-20"
              />
            )}
            <input
              onChange={(e) => {
                setFiles(e.target.files?.[0]);
                setThumbnail(URL.createObjectURL(e.target.files?.[0]));
              }}
              accept="image/*"
              type="file"
              className=" w-full h-full file:rounded-full z-20 opacity-50 text-gray-50 bg-gray-50 rounded-xl  file:hidden text-center  "
            />
            <label className=" absolute text-lg ">
              ارمي الصورة اكنها سخنة او اضغط هنا لاختيارها
            </label>
          </div>
          <div dir="ltr" className="w-full grid  grid-cols-2 gap-16">
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className=""
              label="الاسم"
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
              className=""
              label="رقم الهاتف"
            />

            <Input
              value={oldpass}
              onChange={(e) => {
                setWrongpass(false);
                setResmessage("");
                setOldpass(e.target.value);
              }}
              type="password"
              className={wrongpass ? "text-red-600 outline-red-600 " : ""}
              color={wrongpass ? "red" : null}
              label={wrongpass ? "كلمة السر غير صحيحة" : "كلمة السر القديمة"}
            />
            <Input
              value={newpass}
              onChange={(e) => {
                setNewpass(e.target.value);
              }}
              type="password"
              className=""
              label="كلمة السر الجديدة"
            />
          </div>

          <Button
            type="submit"
            color="deep-orange"
            className="text-black self-center place-self-center   h-16 w-2/6 "
          >
            تحديث البيانات
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
