import con from "../../../components/Db";
import { NextResponse } from "next/server";

const Orders = async () => {
  return new Promise((resolve, reject) => {
    con.query(`select * from orders`, function (err, result) {
      if (err) reject(err);

      if (result) {
        resolve(result);
      } else {
        resolve(false);
      }
    });
  });
};

export async function GET() {
  let orders = await Orders();
  if (orders !== false) {
    return NextResponse.json(orders);
  } else {
    return NextResponse.json([]);
  }
}
