import Image from "next/image";
import Link from "next/link";
import styles from "./characterCard.module.css";
const CharacterCard = (character: any) => {
  return (
    <div className="mb-4 relative hover:opacity-40 rounded-lg">
      <Link href={`/characterList/${character.id}`}>
        <div className={styles.imgContainer}>
          <Image
            src={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
            fill
            className={`${styles.img} rounded-lg`}
            alt=""
          />
        </div>
        <h2 className="absolute bottom-2 right-0 bg-black opacity-70 px-2 rounded-md">
          {character.name}
        </h2>
      </Link>
    </div>
  );
};

export default CharacterCard;
