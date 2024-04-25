import { getData } from "@/libs/data";
import { Data } from "@/types/index";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, context:any) => {
  const {params} = context;

  console.log(params.slug)  
  try {    
    const offset:any =  null ;
    const limit:any =  null ;
    const nameStartsWith = '' ;

    const characterId = Number(params.slug)
   
    const data = await getData(nameStartsWith,offset,limit,characterId);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return new Response(`Error: ${error.message}`, { status: 400 });
  }
};
