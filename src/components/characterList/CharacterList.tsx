import React from 'react'
import CharacterCard from '../characterCard/CharacterCard';
import styles from './characterList.module.css'


const CharacterList = ({characters}:any) => {
  return (
    <div>
        {characters.map(
        (character: { id: number;  }) => (
         <div className={styles.character}  key={character.id}>
           <CharacterCard
            {...character}
          />
         </div>
        )
      )}   
    </div>
  )
}

export default CharacterList