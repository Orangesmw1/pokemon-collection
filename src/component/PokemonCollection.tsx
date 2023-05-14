import React from 'react'
import { Pokemon, PokemonDetail } from '../interface'
import PokemonList from './PokemonList'
import "./pokemon.css"
import { Detail } from '../App'


interface Props {
    listPoke:  PokemonDetail[],
    viewDetail: Detail,
    setDetail: React.Dispatch<React.SetStateAction<Detail>>

}

const PokemonCollection:React.FC<Props> = (props) => {
    const {listPoke,viewDetail,setDetail} = props

    const selectPoke = (id: number) => {
        if(!viewDetail.isOpened) {
            setDetail({
                id: id,
                isOpened: true,
            })
        }
    }

  return (
    <>
        <section className={viewDetail.isOpened ? "collection-container-active" : "collection-container"}>
        {viewDetail.isOpened && (
            <div className="overlay">
            </div>
        )}
            {listPoke.map((poke) => {
                return <div onClick={() => selectPoke(poke.id)} >
                    <PokemonList
                    key={poke.id}
                    name= {poke.name}
                    id= {poke.id}
                    abilities= {poke.abilities}
                    image= {poke.sprites.front_default}
                    viewDetail= {viewDetail}
                    setDetail= {setDetail}
                    />
                </div>
            })}
        </section>
    </>
  )
}

export default PokemonCollection