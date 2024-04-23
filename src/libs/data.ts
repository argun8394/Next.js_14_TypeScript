import axios, { AxiosResponse } from "axios";
import {Data} from '@/types/index'


// interface CharacterData {
//     id:any;
// }

export const getData = async (
//   nameStartsWith: string,
  offset?: number,
  limit?: number,
  characterId?:number
): Promise<Data> => {
  try {
     
    //   const url = `https://gateway.marvel.com/v1/public/characters?ts=1&nameStartsWith=${nameStartsWith}&offset=${offset}&limit=${limit}&apikey=3579453ac950b98ceed0d384978790d4&hash=d578505f73327bda014280c1f938d0d5`;

      let url = null
      if(characterId){
        console.log('first')

        url = `https://gateway.marvel.com/v1/public/characters/${characterId}?&limit=10&ts=1&apikey=3579453ac950b98ceed0d384978790d4&hash=d578505f73327bda014280c1f938d0d5`
        
      }else {
        url =`https://gateway.marvel.com/v1/public/characters?ts=1&offset=${offset}&limit=${limit}&apikey=3579453ac950b98ceed0d384978790d4&hash=d578505f73327bda014280c1f938d0d5`;

      }
      console.log(url)
      const response: AxiosResponse<Data> = await axios.get(url);
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };