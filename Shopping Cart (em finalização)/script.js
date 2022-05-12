/* eslint-disable no-undef */
const ol = document.querySelector(".cart__items");

function cartItemClickListener(event) {
	const button = event.target;
	button.remove();
	saveCartItems(ol.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
	const li = document.createElement("li");
	li.className = "cart__item";
	li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
	li.addEventListener("click", cartItemClickListener);
	return li;
}
const createListCard = async (event) => {
	const test = event.target.parentElement;
	const test1 = test.querySelector(".item__sku").innerText;
	const iten = await fetchItem(test1);
	const { id, title, price } = iten;
	const obj = {
		name: title,
		sku: id,
		salePrice: price,
	};
	const itenCriado = createCartItemElement(obj);
	ol.appendChild(itenCriado);
	saveCartItems(ol.innerHTML);
};

function createProductImageElement(imageSource) {
	const img = document.createElement("img");
	img.className = "item__image";
	img.src = imageSource;
	return img;
}

function createCustomElement(element, className, innerText) {
	const e = document.createElement(element);
	e.className = className;
	e.innerText = innerText;
	return e;
}

function createProductItemElement({ sku, name, image }) {
	const section = document.createElement("section");
	section.className = "item";
	section.appendChild(createCustomElement("span", "item__sku", sku));
	section.appendChild(createCustomElement("span", "item__title", name));
	section.appendChild(createProductImageElement(image));
	const button = createCustomElement("button", "item__add", "Adicionar ao carrinho!");
	section.appendChild(button);
	button.addEventListener("click", createListCard);
	return section;
}

const createListProduct = async () => {
	const item = document.querySelector(".items");
	const product = await fetchProducts("computador");
	const { results } = product;
	results.forEach((element) => {
		const { id, title, thumbnail } = element;
		const obj = {
			sku: id,
			name: title,
			image: thumbnail,
		};
		const elementoCriado = createProductItemElement(obj);
		item.appendChild(elementoCriado);
	});
};

const savedLocal = () => {
	const localStorageSalvo = getSavedCartItems();
	ol.innerHTML = localStorageSalvo;
	const olDps = document.querySelector("ol").childNodes;
	olDps.forEach((element) => element.addEventListener("click", cartItemClickListener));
};

const esvaziar = () => {
	const button = document.querySelector(".empty-cart");
	button.addEventListener("click", () => {
		const pegandoli = document.querySelectorAll("ol li");
		pegandoli.forEach((element) => element.remove());
	});
};

window.onload = () => { 
	esvaziar();
	createListProduct(); 
	savedLocal();
};