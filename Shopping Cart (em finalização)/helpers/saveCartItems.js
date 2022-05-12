/* eslint-disable no-undef */
const saveCartItems = (item) => localStorage.setItem("cartItems", item);

if (typeof module !== "undefined") module.exports = saveCartItems;