/* eslint-disable no-undef */
const getSavedCartItems = () => {
	const itemsJSON = localStorage.getItem("cartItems");
	if (itemsJSON === null) return [];
	return JSON.parse(itemsJSON);
};

if (typeof module !== "undefined") module.exports = getSavedCartItems;