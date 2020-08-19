import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useMondeda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
	margin-top: 20px;
	font-weight: bold;
	font-size: 20px;
	padding: 10px;
	background-color: #66a2fe;
	border: none;
	width: 100%;
	border-radius: 10px;
	color: #fff;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #326ac0;
		cursor: pointer;
	}
`;

const Formulario = ({ setMoneda, setCriptomoneda }) => {
	// state del estado de criptomonedas
	const [listaCripto, setListaCripto] = useState([]);
	const [error, setError] = useState(false);

	const MONEDAS = [
		{ codigo: 'USD', nombre: 'Dolar estadounidense' },
		{ codigo: 'EUR', nombre: 'Euro' },
		{ codigo: 'GBP', nombre: 'Libra Esterlina' },
	];
	// utilizar useMoneda
	const [moneda, SeleccionarMoneda] = useMondeda('Elije tu moneda', '', MONEDAS);
	// utilizar criptomoneda
	const [cripto, SelectCripto] = useCriptomoneda('Elije tu cripto-moneda', '', listaCripto);

	//Ejecutar llamado a la API
	useEffect(() => {
		const consultarAPI = async () => {
			const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
			const resultado = await axios.get(url);
			setListaCripto(resultado.data.Data);
		};
		consultarAPI();
	}, []);

	// cuando el usuario hace submit
	const cotizarMoneda = (e) => {
		e.preventDefault();

		// Validar ambos campos
		if (moneda === '' || cripto === '') {
			setError(true);
			return;
		}

		// pasar datos a componente principal
		setError(false);
		setMoneda(moneda);
		setCriptomoneda(cripto);
	};
	return (
		<form onSubmit={cotizarMoneda}>
			{error ? <Error mensaje="Hubo un error" /> : null}
			<SeleccionarMoneda />
			<SelectCripto />
			<Boton type="submit" value="Calcular"></Boton>
		</form>
	);
};

Formulario.propTypes = {
	setMoneda: PropTypes.func.isRequired,
	setCriptomoneda: PropTypes.func.isRequired,
};

export default Formulario;
