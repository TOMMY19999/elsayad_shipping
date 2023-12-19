import { NextRequest, NextResponse } from "next/server";
import con from "../../../../components/Db";

const upadateprofile = async (name, phone, oldpass, newpass, id) => {
  return new Promise((resolve, reject) => {
    if (oldpass === null && newpass === null) {
      con.query(
        `update workeres set name = '${name}' , phonenumber = '${phone}' where id = '${id}'`,
        function (err, results) {
          if (err) reject(err);
          resolve(results);
        }
      );
    } else {
      con.query(
        `update workeres set name = '${name}' , phonenumber = '${phone}' , password = '${newpass}' where id = '${id}'`,
        function (err, results) {
          if (err) reject(err);
          resolve(results);
        }
      );
    }
  });
};
export async function POST(req, params) {
  const data = await req.json();
  const user = params.params.user;
  if (data.oldpass === undefined) {
    await upadateprofile(data.name, data.phonenumber, null, null, user);
    return NextResponse.json(true);
  } else {
    await upadateprofile(
      data.name,
      data.phonenumber,
      data.oldpass,
      data.newpass,
      user
    );
    return NextResponse.json(true);
  }
}
