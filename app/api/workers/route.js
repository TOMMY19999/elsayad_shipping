import { NextResponse } from "next/server";
import con from "../../../components/Db";
import axios from "axios";
const workers = async () => {
  return new Promise((resolve, reject) => {
    con.query(`select * from workeres`, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export async function GET() {
  return NextResponse.json(await workers());
}
