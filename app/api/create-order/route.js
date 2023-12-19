import { NextResponse } from "next/server";
import con from "../../../components/Db";

const ExpressOrder = async (req) => {
  console.log(req);
  return new Promise((resolve, reject) => {
    con.query(
      `insert into orders  (express_ship , discription , service_date , weight , pieces ,  cod , ref_number ,  special_notes , customer_code , customer_Name , customer_Mobile , street_adress , bulding , floor , apartment , city , neighbor_hood , subzone , location , files_count)  VALUES ('1' , '${req.discreption}' , '${req.Orderdate}' , '${req.weight}' , '${req.pieces}' , '${req.price}' , '${req.ref}' , '${req.notes}' , '${req.customercode}' , '${req.name}' , '${req.phone}' , '${req.adress}' ,  '${req.bulding}' , '${req.dor}' , '1' , '${req.selectedcity}' , '${req.selectedneighborhood}' , '${req.selectedsubzone}' ,  '${req.location}' , '${req.countfile}')
    `,
      function (err, result) {
        if (err) reject(err);
        con.query(
          `select max(id) as newid from orders `,
          function (err, result) {
            if (err) reject(err);
            resolve(result[0].newid);
          }
        );
      }
    );
  });
};

export async function POST(requist) {
  const req = await requist.json();

  switch (req.type) {
    case "express":
      return NextResponse.json({ order: await ExpressOrder(req) });
      break;
    case "normalShip":
      break;
  }
}
