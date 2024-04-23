import { getData } from "@/libs/data";
import { Data } from "@/types/index";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


export const GET = async (req: NextRequest, res: NextResponse<Data>) => {
    
  try {    
    // const offset =  Number(req.nextUrl.searchParams.get('offset')) ;
    const characterId = (req.nextUrl.searchParams.get('characterId'))
    console.log(characterId)
    // const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=3579453ac950b98ceed0d384978790d4&hash=d578505f73327bda014280c1f938d0d5`;
    // const res = await axios.get(url);
    console.log(res)
    const data = await getData(characterId);
    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    return new Response(`Error: ${error.message}`, { status: 400 });
  }
};
