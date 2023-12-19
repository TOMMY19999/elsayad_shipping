import { writeFile, unlink, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import con from "../../../components/Db";
const uploadOrder = async (files, names, order) => {
  return new Promise((resolve, reject) => {
    let newnames = JSON.stringify(names);

    con.query(
      `update orders set files = '${newnames.replace(
        "'",
        ""
      )}' where id = '${order}'`,
      async function (err, result) {
        if (err) reject(err);
        await mkdir(`./public/orders/${order}`);
        for (let i = 0; i < files.length; i++) {
          const byteData = await files[i].arrayBuffer();
          const buffer = Buffer.from(byteData);

          await writeFile(
            `./public/orders/${order}/${files[i].name.replace("'", "")}`,
            buffer
          );
          resolve(true);
        }
      }
    );
  });
};

const typetodelete = async (id) => {
  return new Promise((resolve, reject) => {
    con.query(
      `select pptype from workeres where id = '${id}'`,
      function (err, result) {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export async function POST(req) {
  const data = await req.formData();
  const id = data.get("id");
  const order = data.get("order");
  const deletepic = data.get("delete");
  const type = await typetodelete(id);

  if (deletepic) {
    await unlink(`./public/images/profiles/${id}${type[0].pptype}`).catch(
      (err) => {
        return NextResponse.json(false);
      }
    );
    con.query(
      `update workeres set isphoto = "0" where id = '${id}' `,
      function (err, result) {
        if (err) console.log(err);
        console.log(result);
      }
    );
    return NextResponse.json({ success: "deleted" });
  } else if (id) {
    const file = data.get("profile");
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/images/profiles/${id}${
      file.type === "image/png"
        ? ".png"
        : file.type === "image/jpeg"
        ? ".jpg"
        : ".jpg"
    }`;
    con.query(
      `update workeres set isphoto = "1" , pptype = '${file.type}' where id = '${id}' `,
      function (err, result) {
        if (err) console.log(err);
        console.log(result);
      }
    );
    await writeFile(path, buffer);
    return NextResponse.json({ success: true });
  } else if (order) {
    const filesarr = [];
    const names = [];
    const count = Number(data.get("count"));
    for (let i = 0; i < count; i++) {
      const files = data.get(`${i + 1}`);

      filesarr.push(files);
      names.push(files.name);
    }
    console.log(order);
    return NextResponse.json({
      success: await uploadOrder(filesarr, names, order),
    });
  }
}
