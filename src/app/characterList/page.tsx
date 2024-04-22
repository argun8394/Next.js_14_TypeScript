"use client"
import axios from "axios";
import CharacterCard from "../../components/characterCard/CharacterCard";
// import styles from './characterList.module.css'
import CharacterList from "@/components/characterList/CharacterList";


async function getData(offset:any) {
  const url = `https://gateway.marvel.com/v1/public/characters?ts=1&offset=${offset}&apikey=3579453ac950b98ceed0d384978790d4&hash=d578505f73327bda014280c1f938d0d5`;
  const res = await axios.get(url);

  if (!res.status) {
    throw new Error("Failed to fetch data");
  }

  return res.data.data.results;
}

const FilmList = async () => {
// const [offset,setOffset] = useState(0)
  const offset = 30

  const characters = await getData(offset);
  console.log('xxxxxxxxxxxxxxxxxxxx',characters)


  return (
    <div >
      {/* <CharacterList {...characters.results}/> */}
{characters.map(
        (character: { id: number;  }) => (
         <div className=''  key={character.id}>
           <CharacterCard
            {...character}
          />
         </div>
        )
      )}      
    </div>
  );
};

export default FilmList;
