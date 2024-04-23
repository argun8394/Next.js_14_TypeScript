import { getData } from "@/libs/data";
import { Data } from "@/types/index";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse<Data>) => {
  try {

   
    const offset =  Number(req.nextUrl.searchParams.get('offset')) ;
    const limit =  Number(req.nextUrl.searchParams.get('limit')) ;
    const nameStartsWith =  req.nextUrl.searchParams.get('nameStartsWith') || '' ;

    const data = await getData(nameStartsWith,offset,limit);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return new Response(`Error: ${error.message}`, { status: 400 });
  }
};
