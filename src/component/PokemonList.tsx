import React, { useEffect, useState } from 'react'
import "./pokemon.css"
import { Detail } from '../App';

interface Props {
    name: string;
    id: number;
    image: string;
    abilities: {
        name: string
        ability: string
    }[] | undefined;
    viewDetail: Detail,
    setDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonList:React.FC<Props> = (props) => {
    const {id,name,image,abilities, viewDetail, setDetail} = props
    const [isSelect, setSelect] = useState<boolean>(false)

    useEffect(()=> {
        setSelect(id=== viewDetail?.id)
    },[viewDetail])

    const closeDetail = () => {
        setDetail({
            id:0,
            isOpened: false
        })
    }

  return (
    <div>
        {isSelect ? (
            <section className="pokemon-list-detailed">
                <div className="detail-container">
                    <p className="detail-close" onClick={closeDetail}>
                        x
                    </p>
                    <div className="detail-info">
                        <img src={image} alt="" className='detail-img' />
                        <p className='detail-name'>{name}</p>
                    </div>

                    <div className="detail-skill">
                        <p className="detail-ability">Abilities:</p>
                        <ul className='box-ability'>
                        {abilities?.map((ab:any) => {
                            
                            return <li className=""><img src={ab.ability.url} alt="" />{ab.ability.name}</li>
                        })}
                        </ul>
                        
                    </div>
                </div>
            </section>
        ): (<section className="pokemon-list-container">
        <p className='pokemon-name'>{name}</p>   
        <img src={image} alt="" />
    </section>)}
        
    </div>
  )
}

export default PokemonList