import axios from "axios";
import CharacterCard from "../../components/characterCard/CharacterCard";
import styles from './characterList.module.css'


async function getData() {
  const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=3579453ac950b98ceed0d384978790d4&hash=d578505f73327bda014280c1f938d0d5`;
  const res = await axios.get(url);

  if (!res.status) {
    throw new Error("Failed to fetch data");
  }

  // console.log(res.status);
  return res.data;
}

const FilmList = async () => {
  const characters = await getData();

  characters.data.results.map((item:any) => {
    console.log(item.thumbnail.path);

  })
  return (
    <div className={styles.container}>

{characters.data.results.map(
        (character: { id: number;  }) => (
         <div className={styles.character}>
           <CharacterCard
            key={character.id} {...character}
          />
         </div>
        )
      )}      
    </div>
  );
};

export default FilmList;
