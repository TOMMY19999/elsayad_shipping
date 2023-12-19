import { NextResponse, NextRequest } from "next/server";
import con from "../../../components/Db";

const response = NextResponse;

// token
var Token =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@£$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@£$%^&*()_+";
function randomToken() {
  var newrandom = "";
  for (var i = 0; i < 119; i++) {
    newrandom += Token.charAt(Math.floor(Math.random() * 119));
  }
  return newrandom;
}

var newtoken = randomToken();
// new auth
const data = (req) => {
  return new Promise((resolve, reject) => {
    try {
      con.query(
        `UPDATE workeres SET token = '${newtoken}' WHERE username = '${req.username}' AND password = '${req.password}' collate utf8_bin `,
        function (err, result) {
          if (err) {
            return reject(err);
          }
          con.query(
            `SELECT * FROM workeres WHERE username = '${req.username}' AND password = '${req.password}' AND token = '${newtoken}' collate utf8_bin `,
            function (err, result) {
              if (err) console.log(err);

              return resolve(result);
            }
          );
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};
//  check auth
const checkauth = (req) => {
  return new Promise((resolve, reject) => {
    try {
      con.query(
        `SELECT * FROM workeres WHERE token = '${req.token}' `,
        function (err, result) {
          if (err) console.log(err);
          return resolve(result);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};
export async function POST(request, res) {
  const req = await request.json();

  if (request.method === "POST" && req.login === true) {
    return response.json({ body: await data(req) });
  } else if (request.method === "POST" && req.logout === true) {
    con.query(
      `UPDATE workeres SET token = NULL WHERE username = '${req.username}' AND password = '${req.password}'`,
      function (err, result) {
        if (err) console.log(err);
      }
    );
    return response.json(true);
  } else if (request.method === "POST" && req.checkauth === true) {
    return response.json({ body: await checkauth(req) });
  }
}
