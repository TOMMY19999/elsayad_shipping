"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Checkbox, Spinner } from "@material-tailwind/react";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";

const Employees = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);

  const getusers = async () => {
    await axios.get("/api/users").then((response) => {
      setData(response.data);
      setLoading(false);
    });
  };
  const changestate = async (id, type, value) => {
    await axios.post("/api/upatestate", {
      id: id,
      type: type,
      value: value,
    });

    forceUpdate();
  };
  const Authrize = async (value, id) => {
    await axios.post("/api/upatestate", {
      id: id,
      auth: value,
    });

    forceUpdate();
  };

  useEffect(() => {
    getusers();
  }, [update]);

  const Workers = (props) => {
    const url =
      props.isphoto === 1
        ? `/images/profiles/${props.id}.jpg`
        : `/images/profiles/avatar.png`;
    return (
      <tr className="w-full h-20 text-center bg-gray-100  shadow-xl  ">
        <td className="text-xl  text-orange-900">{props.name}</td>
        <td>
          <Checkbox
            checked={props.is_admin > 0 ? true : false}
            onChange={(e) => {
              if (props.is_admin > 0) {
                changestate(props.id, "is_admin", 0);
              } else {
                changestate(props.id, "is_admin", 1);
              }
            }}
          />
        </td>
        <td>
          <Checkbox
            checked={props.is_deliver > 0 ? true : false}
            onChange={(e) => {
              if (props.is_deliver > 0) {
                changestate(props.id, "is_deliver", 0);
              } else {
                changestate(props.id, "is_deliver", 1);
              }
            }}
          />
        </td>
        <td>
          <Checkbox
            checked={props.worker > 0 ? true : false}
            onChange={(e) => {
              if (props.worker > 0) {
                changestate(props.id, "worker", 0);
              } else {
                changestate(props.id, "worker", 1);
              }
            }}
          />
        </td>
        <td>
          <Checkbox
            checked={props.is_shipper > 0 ? true : false}
            onChange={(e) => {
              if (props.is_shipper > 0) {
                changestate(props.id, "is_shipper", 0);
              } else {
                changestate(props.id, "is_shipper", 1);
              }
            }}
          />
        </td>
        <td className="grid h-20 justify-center items-center ">
          <Image
            alt="icon"
            src={url}
            width={10}
            height={10}
            className="w-12 h-12 rounded-full"
          />
        </td>
        <td>
          {props.authraized > 0 ? (
            <button
              onClick={() => {
                Authrize("0", props.id);
              }}
              className="bg-gradient-to-r from-green-500 to-cyan-200 shadow-xl w-20 h-10 text-white drop-shadow-lg rounded-full"
            >
              الغاء التفعيل
            </button>
          ) : (
            <button
              onClick={() => {
                Authrize("1", props.id);
              }}
              className="bg-gradient-to-r from-red-500 to-red-200 shadow-xl w-20 h-10 text-white  drop-shadow-lg rounded-full"
            >
              تفعيل
            </button>
          )}
        </td>
      </tr>
    );
  };
  useEffect(() => {
    getusers();
  }, [update]);
  return (
    <div className="grid  w-full h-full   items-center">
      <div
        className={
          loading
            ? "items-center grid justify-center bg-gray-400  rounded-3xl        empbody     overflow-hidden"
            : "bg-gray-400  rounded-3xl        empbody     overflow-auto   scrollbar "
        }
      >
        {loading ? (
          <Spinner className=" w-32 h-32 " />
        ) : (
          <table className=" w-full  ">
            <thead className="h-16 bg-gray-200">
              <tr className="  h-16 select-none">
                <th className="w-32  text-center   ">إسم الموظف</th>
                <th className="w-20  text-center">مدير</th>
                <th className="w-20  text-center">طيار</th>
                <th className="w-20  text-center">مسئول طلبات</th>
                <th className="w-20  text-center">مسئول شحن</th>
                <th className=" w-20  text-center">الصورة</th>
                <th className=" w-20  text-center">حالة الحساب</th>
              </tr>
            </thead>
            <tbody className="w-full  h-full bg-gray-100  ">
              {data.map((item) => {
                return (
                  <Workers
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    authraized={item.authraized}
                    is_admin={item.is_admin}
                    is_deliver={item.is_deliver}
                    is_shipper={item.is_shipper}
                    isphoto={item.isphoto}
                    worker={item.worker}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default Employees;
