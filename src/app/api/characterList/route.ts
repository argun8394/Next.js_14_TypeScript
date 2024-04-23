import { getData } from "@/libs/data";
import { Data } from "@/types/index";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse<Data>) => {
  try {

    const nameStartsWith = "A";
    const offset =  Number(req.nextUrl.searchParams.get('offset')) ;
    console.log(offset)
    const limit = 20;
    const data = await getData(offset,limit);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return new Response(`Error: ${error.message}`, { status: 400 });
  }
};
