import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';

const Contenedor = styled.div`
max-width: 1200px;
margin: 0 auto;
@media(min-width: 992px){
display: grid;
grid-template-columns: repeat(2, 1fr);
column-gap: 2rem;
}
`;

const Imagen = styled.img`
max-width: 100%;
margin-top: 5rem;
`;

const Heading = styled.h1`
font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
&::after {
  content: '';
  width: 100px;
  height: 6px;
  background-color: #66A2FE;
  display: block;

}
`;


function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (moneda === '')
        return;
      // Consultando api para cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const result = await axios.get(url);

      // Mostrar spinner
      setCargando(true);

      //ocultar el spiner y mostrar resultado
      setTimeout(() => {
        setCargando(false);
        setResultado(result.data.DISPLAY[criptomoneda][moneda]);
      }, 1500);
    }
    cotizarCriptomoneda();
  }, [moneda, criptomoneda])

  // Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />
  return (
    <Contenedor>
      <div>
        <Imagen src={imagen}
          alt="Imagen criptomoneda" />
      </div>
      <div>
        <Heading>Cotizador de criptomonedas al instante</Heading>
        <Formulario setMoneda={setMoneda} setCriptomoneda={setCriptomoneda} />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
