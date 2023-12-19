import { NextResponse, NextRequest } from "next/server";

const response = NextResponse
export async function POST(request){
    const req = await request.json();
    if (request.method === 'POST') {


        return response.json({req})
      }

}
