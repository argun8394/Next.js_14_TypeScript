import axios, { AxiosResponse } from "axios";
import { Data } from "@/types/index";
import { md5 } from "js-md5";

let API_BASE_URL = "";
let API_PUBLIC_KEY = "";
let API_PRIVATE_KEY = "";

if (process.env.NODE_ENV === "development") {
  API_BASE_URL = process.env.API_BASE_URL_DEV ?? "";
  API_PUBLIC_KEY = process.env.API_PUBLIC_KEY_DEV ?? "";
  API_PRIVATE_KEY = process.env.API_PRIVATE_KEY_DEV ?? "";
} else {
  API_BASE_URL = process.env.API_BASE_URL_DEV_PROD ?? "";
  API_PUBLIC_KEY = process.env.API_PUBLIC_KEY_DEV_PROD ?? "";
  API_PRIVATE_KEY = process.env.API_PRIVATE_KEY_DEV_PROD ?? "";
}

const getTimeStamp = () => Date.now().toString();
const getHash = (timeStamp: string) =>
  md5(timeStamp + API_PRIVATE_KEY + API_PUBLIC_KEY);

const timeStamp = getTimeStamp();
const hash = getHash(timeStamp);
const query = `ts=${timeStamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;

export const getData = async (
  nameStartsWith?: string,
  offset?: number,
  limit?: number,
  characterId?: number
): Promise<Data> => {
  try {
    let url = null;

    if (characterId) {
      url = `${API_BASE_URL}/${characterId}?${query}`;
    } else if (nameStartsWith) {
      url = `${API_BASE_URL}?nameStartsWith=${nameStartsWith}&offset=${offset}&limit=${limit}&${query}`;
    } else {
      url = `${API_BASE_URL}?&offset=${offset}&limit=${limit}&${query}`;
    }

    const response: AxiosResponse<Data> = await axios.get(url);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};
