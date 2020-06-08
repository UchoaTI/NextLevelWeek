import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {FiArrowDownLeft} from 'react-icons/fi';
import {Map,TileLayer, Marker} from 'react-leaflet';
import api from '../../services/api'; 


import './styles.css';

import logo from '../../assets/logo.svg'

interface Iten{
    id: number;
    title: string;
    image_url: string;
}

const CreatePoint = () =>{
    const [itens, setItens] = useState<Iten[]>([]);

    useEffect(() => {
        api.get('itens').then(response=>{
           setItens(response.data)
        })
    }, []);

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowDownLeft/>
                    Voltar para home
                </Link>
            </header>

            <form>
              <h1 >cadastro do <br/> ponto de coleta</h1>   

              <fieldset>
                  <legend>
                     <h2>Dados</h2> 
                  </legend>
                  <div className="field">
                    <label htmlFor="name">Nome da entidade</label>
                    <input 
                    type="text"  
                    name="name"
                    id="name"
                    />
                  </div>
                  <div className="field-group">
                  <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input 
                    type="email"  
                    name="email"
                    id="email"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="whatsapp">Whatsapp</label>
                    <input 
                    type="text"  
                    name="whatsapp"
                    id="whatsapp"
                    />
                  </div>    
                  </div>
                  
              </fieldset>
              <fieldset>
                  <legend>
                     <h2>Endereço</h2> 
                     <span>Selecione o endereço no mapa</span>
                  </legend>
                    <Map center={[-7.0963737,-34.8441845]} zoom={17}>
                        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                        <Marker position={[-7.0963737,-34.8441845]}/>
                    </Map>
                    <div className="field-group">
                    <div className="field">
                        <label htmlFor="uf">Estado (UF)</label>
                        <select name="uf" id="uf">
                        <option value="0">Selecione uma UF</option>
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="city">Cidade</label>
                        <select name="city" id="city">
                        <option value="0">Selecione uma cidade</option>
                        </select>
                    </div>  
                    </div>
              </fieldset>
              <fieldset>
                  <legend>
                     <h2>Ítens de coleta</h2> 
                     <span>Selecione um ou mais ítens abaixo</span>
                  </legend>
                    <ul className="items-grid">
                        {itens.map(iten => (
                        <li key={iten.id}>
                            <img src={iten.image_url} alt={iten.title}/>
                        <span>{iten.title}</span>
                        </li>
                        ))}

                    </ul>
              </fieldset>

              <button type="submit">
                  Cadastrar ponto de coleta
              </button>
            </form>
        </div>
    );
};

export default CreatePoint;