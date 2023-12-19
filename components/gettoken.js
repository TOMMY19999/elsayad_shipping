const { default: con } = require("./Db");

export const getAuth = async () => {
  return new Promise((resolve, reject) => {
    con.query(`select * from Auth_mylerz`, function (err, result) {
      if (err) reject(err);

      resolve(result[0].token);
    }); // end of Promise
  }); // end of query
};
