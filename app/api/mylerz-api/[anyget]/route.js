import axios from "axios";
import { NextResponse } from "next/server";
import { getAuth } from "../../../../components/gettoken";
import { addAuth } from "../../../../components/CheckAuth";

export async function GET(req, params) {
  await addAuth();
  const token = await getAuth();
  const type = params.params.anyget;

  return NextResponse.json("what do you want nigga");
}
