import { NextResponse } from "next/server";

const { default: con } = require("../../../components/Db");

const updateUser = async (id, type, value) => {
  return new Promise((resolve, reject) => {
    con.query(
      `update workeres set ${type} = '${value}' where id = '${id}' `,
      function (err, result) {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
const Authrize = async (id, auth) => {
  return new Promise((resolve, reject) => {
    con.query(
      `update workeres set authraized = '${auth}' where id = '${id}' `,
      function (err, result) {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
export async function POST(req) {
  const requist = await req.json();
  if (requist.auth) {
    return NextResponse.json(await Authrize(requist.id, requist.auth));
  } else {
    return NextResponse.json(
      await updateUser(requist.id, requist.type, requist.value)
    );
  }
}
