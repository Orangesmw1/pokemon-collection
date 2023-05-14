import React, {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './component/PokemonCollection';
import { Pokemon } from './interface';

interface Pokemons {
  name: string;
  url: string
}

export interface Detail {
  id: number,
  isOpened: boolean
}



const App:React.FC = () => {
  const [listPoke, setListPoke] = useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setDetail] = useState<Detail>({
    id:0,
    isOpened: false
  })
  
  useEffect(() => {
    const getPoke = async() => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20")

      setNextUrl(res.data.next)

      res.data.results.forEach(async(infoPoke:Pokemons,index: number) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${infoPoke.name}`)
        setListPoke((p) => [...p,poke.data])
        setLoading(false)
      });
    }
    getPoke()
  },[])

  const nextPage = async () => {
    setLoading(true)
    const res = await axios.get(nextUrl)
    setNextUrl(res.data.next)

    res.data.results.forEach(async(infoPoke:Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${infoPoke.name}`)
        setListPoke((p) => [...p,poke.data])
        setLoading(false)

    });
  }

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon Colletion</header>
        <PokemonCollection listPoke ={listPoke} viewDetail={viewDetail} setDetail={setDetail} />

        {!viewDetail.isOpened && (
          <div className="btn">
          <button onClick={nextPage}>{loading ? "Loading..." : "Load more"}</button>
        </div>
        )}
        
      </div>
    </div> 
  );
}

export default App;
