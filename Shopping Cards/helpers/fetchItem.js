/* eslint-disable no-undef */
const fetchItem = (id) => {
	const idItem = id;
	const API_URL = `https://api.mercadolibre.com/items/${idItem}`;
  
	return fetch(API_URL).then((response) => response.json()).then((data) => ({ sku: data.id, name: data.title, salePrice: data.price }));
};

if (typeof module !== "undefined") module.exports = fetchItem;
