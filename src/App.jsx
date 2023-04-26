import { useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import api from './services/axios'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function search() {
    if(input == '') {
      alert("Preencha o cep corretamente")
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
      console.log(response.data)
    }catch{
      alert("erroouuuu")
      setInput('')
    }
  }

  return (
    <div className='container'>
      <div className='main'>
        <h1 className='title'>Onde fica ?</h1>
        <div className='input'>
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
