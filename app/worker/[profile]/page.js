"use client";
import { Spinner } from "@material-tailwind/react";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { selectUser } from "@/components/userSlice";
import { useSelector } from "react-redux";
import { MdLocalShipping } from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa6";
import { IoPrint } from "react-icons/io5";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Document, Page } from "react-pdf";
import { city } from "@/assets/city";

const Profile = (props) => {
  const [loading, setLoading] = useState(false);
  const [ourOrders, setOurOrders] = useState([]);
  const [viewfiles, setViewfiles] = useState([]);
  const [view, setView] = useState(false);
  const [viewid, setViewid] = useState(null);

  const user = useSelector(selectUser);
  const router = useRouter();
  const params = window.location.hostname;
  const port = window.location.port;

  const Orders = async () => {
    await axios.get("/api/orders").then((res) => {
      setOurOrders(res.data);
    });
  }; // here comes the orders
  useEffect(() => {
    Orders();
  }, []);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      setView(false);
      setViewfiles([]);
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
  });

  const ViewOrder = () => {
    return (
      <div className="bg-gray-400 absolute grid grid-cols-3 gap-5 justify-center  items-center  overflow-auto scrollbar   rounded-xl  z-50 h-4/6 w-4/6">
        <span
          onClick={() => {
            setView(false);
            setViewfiles([]);
            caches.keys().then((names) => {
              names.forEach((name) => {
                caches.delete(name);
              });
            });
          }}
          className="absolute bg-orange-600 top-0 left-0 right-0 ml-auto mt-2 cursor-pointer mr-auto w-10 h-10 text-center  rounded-full "
        >
          <h1 className="mt-2 text-xl text-white ">X</h1>
        </span>
        {viewfiles.map((item) => {
          if (item.slice(-4) === ".pdf") {
            console.log(`/orders/${viewid}/${item}`);
            return (
              <>
                <embed
                  type="application/pdf"
                  className="overflow-auto scrollbar place-self-center w-auto shadow-lg h-4/6 rounded-lg"
                  src={`/orders/${viewid}/${item}`}
                />
              </>
            );
          } else {
            return (
              <Image
                src={`/orders/${viewid}/${item}`}
                height={20}
                width={20}
                alt="order-image"
                className=" w-auto h-4/6 shadow-lg place-self-center rounded-lg"
              />
            );
          }
        })}
      </div>
    );
  };
  const Oerder = (props) => {
    const comingFiles = JSON.parse(props.files);
    const finalcity = city[city.findIndex((x) => x.Id === Number(props.city))];
    const finalZone =
      finalcity.Zones[
        finalcity.Zones.findIndex((x) => x.Id === Number(props.counrty))
      ];

    return (
      <tr className="w-full h-20 text-center bg-gray-100  shadow-xl  ">
        <td className="text-xl select-none  text-orange-900">
          {props.ref_numb}
        </td>
        <td>{props.state > 0 ? "جاهز للشحن" : "لم يتنهي بعد"}</td>
        <td>
          {props.kind ? (
            <FaMotorcycle className="w-full text-2xl text-blue-gray-800" />
          ) : (
            <MdLocalShipping className="w-full text-2xl text-blue-gray-800" />
          )}
        </td>
        <td>{finalcity.ArName}</td>
        <td>{finalZone.ArName}</td>
        <td className="grid h-20 justify-center cursor-pointer items-center ">
          <div
            onClick={() => {
              setViewfiles(comingFiles);
              setView(true);
              setViewid(props.id);
            }}
            className="w-20 h-5/6 overflow-auto scrollbar  cursor-pointer bg-gray-300 rounded-lg hover:shadow-2xl  shadow-lg grid grid-cols-2 gap-2 justify-items-center items-center"
          >
            {comingFiles !== null
              ? comingFiles.slice(0, 4).map((item) => {
                  if (item.slice(-4) === ".pdf") {
                    return (
                      <>
                        <embed
                          width="100%"
                          type="application/pdf"
                          className="overflow-auto  cursor-pointer scrollbar h-9 rounded-lg"
                          src={`/orders/${props.id}/${item}`}
                        />
                      </>
                    );
                  } else {
                    return (
                      <Image
                        src={`/orders/${props.id}/${item}`}
                        height={20}
                        width={20}
                        alt="order-image"
                        className="h-9 w-9 cursor-pointer rounded-lg"
                      />
                    );
                  }
                })
              : null}
          </div>
        </td>
        <td className=" h-20 w-20    ">
          {props.state > 0 ? (
            <IoPrint className="place-self-center w-full self-center text-center text-4xl drop-shadow-xl text-orange-600" />
          ) : (
            <button className="bg-gradient-to-r from-green-500  to-cyan-200 shadow-xl w-20 h-12  text-white drop-shadow-lg rounded-full">
              انتهاء
            </button>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="grid  w-full h-full  scrollbar    items-center">
      {view ? <ViewOrder /> : null}
      <div
        className={
          loading
            ? "items-center grid justify-center bg-gray-400  rounded-3xl        orederbody     overflow-auto"
            : view
            ? "bg-gray-400  rounded-3xl        orederbody     overflow-auto blur-md"
            : "bg-gray-400  rounded-3xl        orederbody     overflow-auto"
        }
      >
        {user.is_worker > 0 ? (
          <button
            onClick={() => {
              router.push(`/worker/${user.username}/new-order`);
            }}
            className="bg-gradient-to-r from-green-500  to-cyan-200 shadow-xl w-32 h-12 absolute -mt-9 -mr-24 text-white drop-shadow-lg rounded-full"
          >
            طلبية جديدة
          </button>
        ) : null}
        {loading ? (
          <Spinner className=" w-32 h-32 " />
        ) : ourOrders.length > 0 ? (
          <table className=" w-full  ">
            <thead className="h-16 bg-gray-200">
              <tr className="  h-16 select-none">
                <th className="w-20  text-center   ">رقم الاوردر</th>
                <th className="w-20  text-center">الحالة</th>
                <th className="w-20  text-center">نوع الشحن</th>
                <th className="w-20  text-center">المحافظة</th>
                <th className="w-20  text-center">المدينة</th>
                <th className=" w-20  text-center">صور الطلبية</th>
                <th className=" w-20  text-center">زر التفاعل</th>
              </tr>
            </thead>
            <tbody className="w-full  h-full  bg-gray-100  ">
              {ourOrders.map((item, index) => {
                return (
                  <Oerder
                    id={item.id}
                    ref_numb={item.ref_number}
                    state={item.finished}
                    kind={item.express_ship > 0 ? true : false}
                    city={item.city}
                    counrty={item.neighbor_hood}
                    subzone={item.subzone}
                    countfile={item.files_count}
                    key={index}
                    files={item.files}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1 className=" mt-96 text-2xl   text-center text-orange-900 ">
            مفيش اوردرات ربنا يبعت
          </h1>
        )}
      </div>
    </div>
  );
};
export default Profile;
