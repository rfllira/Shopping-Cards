function createProductImageElement(imageSource) {
	const img = document.createElement("img");
	img.className = "item__image";
	img.src = imageSource;
	return img;
}

function createCustomElement(element, className, innerText, onclickCallback){
	const e = document.createElement(element);
	e.className = className;
	e.innerText = innerText;
	if (onclick !== undefined) e.onclick = onclickCallback;
	return e;
}

function storeCart() {
	const lista = document.getElementsByClassName("cart__items")[0];
	const items = [...lista.children].map((li) => ({
		sku: li.getAttribute("data-sku"),
		name: li.getAttribute("data-name"),
		salePrice: li.getAttribute("data-salePrice"),
	}));

	saveCartItems(items);
	const totalPrice = items.reduce((acc, produto) => acc + parseFloat(produto.salePrice), 0);
	document.getElementById("total").innerText = `R$ ${totalPrice}`;
}

function cartItemClickListener(event) {
	const produtoClicado = event.target;
	produtoClicado.parentNode.removeChild(produtoClicado);
	storeCart();
}

function createCartItemElement({ sku, name, salePrice }) {
	const li = document.createElement("li");
	li.className = "cart__item";
	li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
	li.setAttribute("data-sku", sku);
	li.setAttribute("data-name", name);
	li.setAttribute("data-salePrice", salePrice);
	li.addEventListener("click", cartItemClickListener);
	return li;
}

function addProductsCart(produto) {
	const listCart = document.getElementsByClassName("cart__items");
	listCart[0].appendChild(createCartItemElement(produto));
	storeCart();
}

function createCartButton(sku) {
	const addToCartClick = () => {
		fetchItem(sku).then(addProductsCart);
	};
	return createCustomElement("button", "item__add", "Adicionar ao carrinho!", addToCartClick);
}

function createProductItemElement({ sku, name, image }) {
	const section = document.createElement("section");
	section.className = "item";
	section.appendChild(createCustomElement("span", "item__sku", sku));
	section.appendChild(createCustomElement("span", "item__title", name));
	section.appendChild(createProductImageElement(image));
	section.appendChild(createCartButton(sku));
	return section;
}

function addProducts(produto) {
	const items = document.getElementsByClassName("items");
	return items[0].appendChild(createProductItemElement(produto));
}

function emptyCart() {
	const itensCarrinho = document.getElementsByClassName("cart__item");
	[...itensCarrinho].forEach((item) => item.click());
}

function deleteLoading() {
	const carregando = document.getElementsByClassName("loading")[0];
	carregando.parentNode.removeChild(carregando);
}

window.onload = () => {
	fetchProducts("computador").then((data) => data.results).then((resultsArray) => resultsArray.map((produto) => ({
		sku: produto.id,
		name: produto.title,
		image: produto.thumbnail,
	}))).then((products) => products.forEach(addProducts)).then(deleteLoading);
	getSavedCartItems().forEach(addProductsCart);
	const botaoEsvaziar = document.getElementsByClassName("empty-cart")[0];
	botaoEsvaziar.addEventListener("click", emptyCart);
};