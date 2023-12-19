const { default: con } = require("./Db");
import axios from "axios";

export const addAuth = async () => {
  return new Promise((resolve, reject) => {
    con.query(`select * from Auth_mylerz`, function (err, result) {
      if (err) reject(err);
      if (result) {
        if (result[0].token === null) {
          const data = new URLSearchParams({
            grant_type: "password",
            username: result[0].username,
            password: result[0].password,
          });
          axios
            .post("https://mylerzintegrationtest.mylerz.com/token", data, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
              },
            })
            .then((response) => {
              con.query(
                `update Auth_mylerz set token = '${response.data.access_token}' `
              );
              resolve(response.data);
            })
            .catch((err) => console.log(err));
        } else {
          resolve(true);
        }
      }
    }); // end of Promise
  }); // end of query
};
