/* eslint-disable no-undef */
const fetchProducts = (product) => {
	const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
	return fetch(url).then((reponse) => reponse.json()).then((dados) => dados).catch((error) => error);
};

if (typeof module !== "undefined") module.exports = { fetchProducts };