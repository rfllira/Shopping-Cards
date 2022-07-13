/* eslint-disable no-undef */
const fetchProducts = (palavraPesquisa) => {
	const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${palavraPesquisa}`;

	return fetch(API_URL).then((response) => response.json());
};

if (typeof module !== "undefined") module.exports = fetchProducts;
