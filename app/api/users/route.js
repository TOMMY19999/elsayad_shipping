import { NextResponse } from "next/server";
import con from "../../../components/Db";

const users = async () => {
  return new Promise((resolve, reject) => {
    con.query(`select * from workeres`, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export async function GET() {
  let users = await users();
  if (!users) {
    return NextResponse.json([]);
  } else {
    return NextResponse.json(users);
  }
}
