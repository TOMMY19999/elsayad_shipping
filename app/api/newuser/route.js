import { NextRequest, NextResponse } from "next/server";
import con from "../../../components/Db";

const newUser = async (data) => {
  return new Promise((resolve, reject) => {
    con.query(
      `insert into workeres (username , password , is_shipper , is_deliver , phonenumber , name , worker) VALUES  ('${data.username}' , '${data.password}' , '${data.is_shipper}' , '${data.is_deliver}' , '${data.phonenumber}' ,'${data.name}' , '${data.worker}')`,
      function (err, result) {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const checkexist = async (data) => {
  return new Promise((resolve, reject) => {
    con.query(
      `select * from workeres where username = '${data.username}' OR phonenumber = '${data.phonenumber}'`,
      function (err, result) {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export async function POST(req) {
  const data = await req.json();
  const check = await checkexist(data);
  if (check.length === 0) {
    await newUser(data);
    return NextResponse.json({ regestired: true });
  } else if (check.length > 0) {
    return NextResponse.json({ regestired: false });
  }
}
