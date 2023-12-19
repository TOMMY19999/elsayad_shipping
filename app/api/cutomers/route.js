import { NextResponse } from "next/server";
import con from "../../../components/Db";

const getCutomers = async () => {
  return new Promise((resolve, reject) => {
    con.query(`select * from cutomers`, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
export async function GET(req) {
  return NextResponse.json(await getCutomers());
}

export async function POST(requist) {
  req = await requist.json();
  return NextResponse.json({ success: true });
}
