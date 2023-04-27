import { useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import { MdRoom } from "react-icons/md";
import viaCepAPI from './services/viaCepAPI'
import nominatimAPI from './services/nominatimAPI'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  const [latitude, setLatituide] = useState(0)
  const [longitude, setLongitude] = useState(0)

  async function search() {
    if(input == '') {
      alert("Preencha o cep corretamente")
    }

    try{
      const response = await viaCepAPI.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    }catch{
      alert("erroouuuu")
      setInput('')
    }
  }

  async function getLocation() {
    //?format=jsonv2&lat=-28.7203&lon=-49.3871
    navigator.geolocation.getCurrentPosition((e) => {
      setLatituide(e.coords.latitude)
      setLongitude(e.coords.longitude)
    })

     const response = await nominatimAPI.get(`?format=jsonv2&lat=${latitude}&lon=${longitude}`)
     setInput(response.data.address.postcode)
  }

  return (
    <div className='container'>
      <div className='main'>
        <h1 className='title'>Onde é </h1>
        <div className='input'>
          <button className='ondeEstou' onClick={getLocation} title='Pode não ter uma boa precisão, depende do dispositivo'><MdRoom size={25}/></button>
          <input type="text" name="cep" id="cep" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Digite seu CEP'/>
          <button className='btnSearch' onClick={search}><FiSearch size={25} color='white'/></button>
        </div>
        
        {Object.keys(cep).length > 0 && (
          <main className='info'>
            <h2>{cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>{cep.complemento}</span>
            <span>Bairro {cep.bairro}</span>
            <span>{cep.localidade} / {cep.uf}</span>
            <span>DDD {cep.ddd}</span>
          </main>
        )}
      </div>

    </div>
  )
}

export default App
