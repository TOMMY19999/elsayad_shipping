"use client";
import { Checkbox, Progress } from "@material-tailwind/react";
import { useEffect, useState, useCallback } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffectOnce } from "use-effect-once";
import { city } from "@/assets/city";
import { Spinner } from "@material-tailwind/react";

const New_Order = () => {
  const [express, setExpress] = useState(true);
  const [normalship, setNormalship] = useState(false);
  const [slider, setSlider] = useState(1);
  const [data, setData] = useState(null);
  const [custmers, setCustmers] = useState([]);
  const date = new Date().toISOString().substring(0, 10);

  // here the status of new Order
  const [price, setPrice] = useState("");
  const [dicription, setDicription] = useState("");
  const [notes, setNotes] = useState("");
  const [ref, setRef] = useState("");
  const [Orderdate, setOrderdate] = useState(date);
  const [pieces, setPieces] = useState(1);
  const [files, setFiles] = useState(null);
  const [customercode, setCustomercode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dor, setDor] = useState("");
  const [bulding, setBulding] = useState("");
  const [adress, setAdress] = useState("");
  const [selectedcity, setSelectedcity] = useState("");
  const [selectedneighborhood, setSelectedneighborhood] = useState("");
  const [selectedsubzone, setSubzone] = useState("");
  const [countfile, setCountfile] = useState(0);
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  // for viewing

  const [viewO, setViewO] = useState(false);
  const [order, setOrder] = useState("");
  const [percent, setPercent] = useState(0);

  // end Of status of new Order
  useEffect(() => {}, [slider]);
  const getCustomrers = useCallback(async () => {
    const data = await axios.get(`/api/cutomers`);
    setCustmers(data.data);
  }, []);
  useEffectOnce(() => {
    getCustomrers();
  });
  // upload files
  const UploadFiles = async (files, user, type, order, filescount) => {
    const formData = new FormData();
    if (files && filescount && type === "orders") {
      for (let i = 0; i < files.length; i++) {
        formData.append(`${i + 1}`, files[i]);

        console.log(`${i + 1}`);
      }
      setOrder(order);
      formData.append("order", order);
      formData.append("count", filescount);
      const options = {
        onUploadProgress: (progressEvent) => {
          setViewO(true);
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          setPercent(Number(percent));
        },
        headers: {
          "Content-Type": "multipart/form-data ",
        },
      };
      await axios
        .post(
          `/api/upload`,

          formData,

          options
        )
        .then((res) => {
          console.log(res);
        });
    }
  };
  // end of upload files

  const subzone = () => {
    if (selectedneighborhood === "" && selectedcity === "") {
    } else {
      const index = city[
        city.findIndex((x) => x.Id === Number(selectedcity))
      ].Zones.map((item) => {
        return item;
      }).findIndex((index) => {
        return index.Id === Number(selectedneighborhood);
      });
      return index;
    }
  };
  const OrderState = () => {
    return (
      <div className="bg-white z-50 flex  flex-col gap-20 items-center justify-center absolute rounded-2xl w-3/6 h-3/6">
        {percent < 100 ? (
          <Spinner className=" self-center h-20 w-20  place-self-center " />
        ) : (
          <h1 className="text-center text-green-600 text-4xl">{order}</h1>
        )}
        <Progress value={percent} />
        {percent >= 100 ? (
          <button
            onClick={() => {
              setViewO(false);
              setPercent(0);
              setOrder("");
            }}
            className="bg-gradient-to-r from-green-500 place-self-center  to-cyan-300 shadow-xl w-40 h-12  text-white drop-shadow-lg rounded-full"
          >
            كلو تمام{" "}
          </button>
        ) : null}
      </div>
    );
  };
  useEffect(() => {}, [selectedneighborhood, selectedsubzone]);
  // creating Order
  const newOrder = async () => {
    if (express) {
      axios
        .post(`/api/create-order`, {
          type: "express",
          price: price,
          discreption: dicription,
          notes: notes,
          ref: ref,
          Orderdate: Orderdate,
          pieces: pieces,
          customercode: customercode,
          name: name,
          phone: phone,
          dor: dor,
          bulding: bulding,
          adress: adress,
          selectedcity: selectedcity,
          selectedneighborhood: selectedneighborhood,
          selectedsubzone: selectedsubzone,
          countfile: countfile,
          weight: weight,
          location: location,
        })
        .then((response) => {
          UploadFiles(files, null, "orders", response.data.order, countfile);
        });
    } else if (normalship) {
    }
  };

  useEffect(() => {}, [selectedsubzone]);
  // end of creating Order
  const Page = () => {
    if (express) {
      switch (slider) {
        case 1:
          return (
            <motion.div
              initial={{ x: "20%" }}
              animate={{ x: "0" }}
              className=" grid grid-cols-2   gap-5  mt-10 mb-10 ml-10 mr-10 w-full h-full"
            >
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="ملبغ التحصيل"
                value={price}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    setPrice("");
                  } else {
                    setPrice(e.target.value);
                  }
                }}
              />
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="وصف المنتج"
                value={dicription}
                onChange={(e) => {
                  setDicription(e.target.value);
                }}
              />
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="ملاحظات"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="رقم الفاتورة"
                value={ref}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    setRef("");
                  } else {
                    setRef(e.target.value);
                  }
                }}
              />
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="التاريخ"
                type="date"
                value={date}
                onChange={() => {}}
              />
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="عدد القطع"
                value={pieces}
                onChange={(e) => {
                  setPieces(e.target.value);
                }}
              />
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="الوزن"
                value={weight}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    setWeight("");
                  } else {
                    setWeight(e.target.value);
                  }
                }}
              />

              <div className=" flex relative  bottom-0 self-center  h-full w-full items-center  justify-center ">
                {countfile > 0 ? (
                  <div className=" absolute bg-orange-400 w-10 h-10     top-0 -mt-5 z-30 text-center rounded-full ">
                    <h1 className="text-center mt-2 place-self-center ">
                      {countfile}
                    </h1>
                  </div>
                ) : null}
                <input
                  onChange={(e) => {
                    setFiles(e.target.files);
                    setCountfile(e.target.files.length);
                  }}
                  accept="image/* , application/pdf"
                  multiple
                  type="file"
                  className="  w-full h-full file:rounded-full z-20 opacity-50 text-gray-50 bg-gray-50 rounded-xl  file:hidden text-center  "
                />
                <label className=" absolute text-center  ">
                  ارمي الملفات هنا اكنها سخنة او دوس هنا واختارها
                </label>
              </div>
            </motion.div>
          );
          break;
        case 2:
          return (
            <motion.div
              initial={{ x: "20%" }}
              animate={{ x: "0" }}
              className=" grid grid-cols-3  place-content-center   gap-32  mt-10 mb-10 ml-10 mr-10 w-full h-full"
            >
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="كود العميل"
                value={customercode}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    setCustomercode("");
                  } else {
                    setCustomercode(e.target.value);
                  }
                }}
              />
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="الاســم"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="رقم الهاتف"
                maxLength={11}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    setPhone("");
                  } else {
                    setPhone(e.target.value);
                  }
                }}
                value={phone}
              />
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="الدور"
                value={dor}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    setDor("");
                  } else {
                    setDor(e.target.value);
                  }
                }}
              />
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="رقم المبنى"
                value={bulding}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    setBulding("");
                  } else {
                    setBulding(e.target.value);
                  }
                }}
              />
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="العنوان تفصيلي"
                value={adress}
                onChange={(e) => {
                  setAdress(e.target.value);
                }}
              />
              <Select
                onChange={(e) => {
                  setSelectedneighborhood(null);
                  setSubzone(null);
                  setSelectedcity(e);
                }}
                variant="static"
                label="المدينة"
                value={selectedcity}
              >
                {city.map((item, index) => {
                  return (
                    <Option key={index} value={item.Id.toString()}>
                      {item.ArName}
                    </Option>
                  );
                })}
              </Select>
              <Select
                onChange={(e) => {
                  setSelectedneighborhood(e);
                }}
                variant="static"
                label="الحي"
                value={selectedneighborhood}
              >
                {selectedneighborhood === "" && selectedcity === "" ? (
                  <Option>اختار المدينة الأول</Option>
                ) : (
                  city[
                    city.findIndex((x) => x.Id === Number(selectedcity))
                  ].Zones.map((item, index) => {
                    return (
                      <Option key={index} value={item.Id.toString()}>
                        {item.ArName}
                      </Option>
                    );
                  })
                )}
              </Select>
              <Select
                value={selectedsubzone}
                onChange={(e) => {
                  setSubzone(e);
                }}
                variant="static"
                label="المنطقة"
              >
                {subzone() >= 0 ? (
                  city[
                    city.findIndex((x) => x.Id === Number(selectedcity))
                  ].Zones[subzone()].SubZones.map((item, index) => {
                    return (
                      <Option key={index} value={item.Id.toString()}>
                        {item.ArName}
                      </Option>
                    );
                  })
                ) : (
                  <Option>اختار المدينة الأول</Option>
                )}
              </Select>
              <Input
                dir="ltr"
                className="w-15 text-xl text-center"
                variant="standard"
                label="اللوكيشن"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <button
                onClick={newOrder}
                className="bg-gradient-to-r from-green-500 place-self-center  to-cyan-300 shadow-xl w-40 h-12  text-white drop-shadow-lg rounded-full"
              >
                <h1 className="drop-shadow-2xl"> أكد الاوردر</h1>
              </button>
            </motion.div>
          );
          break;
      }
    } else if (normalship) {
      // here block code of normal shipping
    }
  };
  return (
    <div className="flex  w-full h-full flex-col  items-center justify-center ">
      <div className="bg-gray-200 grid grid-flow-col gap-10 w-fit h-20 place-self-start self-center mt-5 rounded-full">
        <div className="ml-5 mr-5">
          <Checkbox
            checked={normalship}
            onChange={() => {
              setNormalship(true);
              setExpress(false);
            }}
            className="w-10 h-10"
            label="شحن شركة "
          />
        </div>
        <div className="ml-5 mr-5">
          <Checkbox
            checked={express}
            onChange={() => {
              setExpress(true);
              setNormalship(false);
            }}
            className="w-10 h-10"
            label=" شحن طيار  "
          />
        </div>
      </div>
      {viewO ? <OrderState /> : null}
      <div className="new_order overflow-auto rounded-3xl flex mt-10 mb-10 shadow-2xl bg-blue-gray-50">
        {Page()}
      </div>
      <div className=" w-full items-center gap-96 flex justify-center mb-5">
        <button
          onClick={() => {
            setSlider(2);
          }}
          className="bg-gradient-to-r from-orange-500   to-orange-300 shadow-xl w-20 h-12  text-white drop-shadow-lg rounded-full"
        >
          التالي
        </button>
        <button
          onClick={() => {
            setSlider(1);
          }}
          className="bg-gradient-to-r from-orange-500  to-orange-300 shadow-xl w-20 h-12  text-white drop-shadow-lg rounded-full"
        >
          السابق
        </button>
      </div>
    </div>
  );
};

export default New_Order;
