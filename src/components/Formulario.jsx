import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useMondeda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

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

const Formulario = (props) => {
	// state del estado de criptomonedas
	const [listaCripto, setListaCripto] = useState([]);

	const MONEDAS = [
		{ codigo: 'USD', nombre: 'Dolar estadounidense' },
		{ codigo: 'GTM', nombre: 'Quetzal' },
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
	return (
		<form>
			<SeleccionarMoneda />
			<SelectCripto />
			<Boton type="submit" value="Calcular"></Boton>
		</form>
	);
};

Formulario.propTypes = {};

export default Formulario;
