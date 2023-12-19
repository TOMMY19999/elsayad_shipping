import { NextResponse } from "next/server";
import { addAuth } from "../../../components/CheckAuth";
import { getAuth } from "../../../components/gettoken";
import axios from "axios";

const GetAllServiceType = async (token) => {
  const data = await axios.get(
    `https://mylerzintegrationtest.mylerz.com/api/Lookup/GetAllServiceType`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  );
  return data.data;
}; // service type
const GetServiceCategory = async (token) => {
  const data = await axios.get(
    `https://mylerzintegrationtest.mylerz.com/api/Lookup/GetServiceCategory`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  );
  return data.data;
}; // service Category
const GetPackageService = async (token) => {
  const data = await axios.get(
    `https://mylerzintegrationtest.mylerz.com/api/Lookup/GetPackageService`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  );
  return data.data;
}; //  GetPackageService
const GetAllPaymentType = async (token) => {
  const data = await axios.get(
    `https://mylerzintegrationtest.mylerz.com/api/Lookup/GetAllPaymentType`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  );
  return data.data;
}; //  GetAllPaymentType
const GetAllAddressCategory = async (token) => {
  const data = await axios.get(
    `https://mylerzintegrationtest.mylerz.com/api/Lookup/GetAllAddressCategory`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  );
  return data.data;
}; //  GetAllAddressCategory
const GetAllProductCategory = async (token) => {
  const data = await axios.get(
    `https://mylerzintegrationtest.mylerz.com/api/Lookup/GetAllProductCategory`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  );
  return data.data;
}; //  GetAllProductCategory

export async function GET() {
  await addAuth();
  const token = await getAuth();

  const newMylrezOrder = {
    serviceType: await GetAllServiceType(token),
    serviceCatigory: await GetServiceCategory(token),
    packageService: await GetPackageService(token),
    allPaymentType: await GetAllPaymentType(token),
    adressCategory: await GetAllAddressCategory(token),
    allproductcategory: await GetAllProductCategory(token),
  }; // here the object of data

  return NextResponse.json(newMylrezOrder);
}
