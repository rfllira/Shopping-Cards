/* eslint-disable no-undef */
const input = document.getElementById("texto-tarefa");
const btnAdd = document.getElementById("criar-tarefa");
const btnRmAll = document.getElementById("apaga-tudo");
const btnRmFin = document.getElementById("remover-finalizados");
const btnSalv = document.getElementById("salvar-tarefas");
const btnCima = document.getElementById("mover-cima");
const btnBaixo = document.getElementById("mover-baixo");
const btnRm = document.getElementById("remover-selecionado");
const list = document.getElementById("lista-tarefas");

const toogleClass = (elem) => {
	for (let x = 0; x < elem.classList.length; x += 1) {
		if (elem.classList[x] === "selected") {
			elem.classList.toggle("selected");
		}
	}
};

const changeBgColor = (event) => {
	const elem = document.getElementsByClassName("selected")[0];

	if (elem !== undefined) {
		toogleClass(elem);
	}

	event.target.classList.toggle("selected");
};

const completeTask = (event) => {
	const li = event.target;
	const classL = li.classList;

	classL.toggle("completed");
};

btnAdd.onclick = () => {
	const tarefa = document.createElement("li");

	tarefa.innerText = input.value;
	list.appendChild(tarefa);
	input.value = "";

	tarefa.onclick = changeBgColor;
	tarefa.ondblclick = completeTask;
};

btnRmAll.onclick = () => {
	list.innerHTML = "";
};

btnRmFin.onclick = () => {
	const elem = document.querySelectorAll(".completed");

	for (let x = 0; x < elem.length; x += 1) {
		elem[x].remove();
	}
};

btnSalv.onclick = () => {
	const item = [];

	for (let x = 0; x < list.children.length; x += 1) {
		item.push(list.children[x].outerHTML);
	}

	localStorage.setItem("list", JSON.stringify(item));
};

btnCima.onclick = () => {
	const elem = document.getElementsByClassName("selected")[0];

	if (elem === undefined) {
		return;
	}

	if (elem.previousElementSibling === null) {
		return;
	}

	const elemTxt = elem.innerText;
	const prevElem = elem.previousElementSibling;
	const prevTxt = prevElem.innerText;

	prevElem.innerText = elemTxt;
	prevElem.className += elem.classList;
	elem.innerText = prevTxt;
	elem.classList.toggle("selected");
};

btnBaixo.onclick = () => {
	const elem = document.getElementsByClassName("selected")[0];

	if (elem === undefined) {
		return;
	}

	if (elem.nextElementSibling === null) {
		return;
	}

	const elemTxt = elem.innerText;
	const nextElem = elem.nextElementSibling;
	const nextTxt = nextElem.innerText;

	nextElem.innerText = elemTxt;
	nextElem.className += elem.classList;
	elem.innerText = nextTxt;
	elem.classList.toggle("selected");
};

btnRm.addEventListener("click", () => {
	const elem = document.getElementsByClassName("selected")[0];

	if (elem === undefined) return;
	elem.remove();
});

window.onload = () => {
	const items = JSON.parse(localStorage.getItem("list"));

	if (items !== null) {
		for (let i = 0; i < items.length; i += 1) {
			list.innerHTML += items[i];
		}

		for (let x = 0; x < list.children.length; x += 1) {
			list.children[x].onclick = changeBgColor;
			list.children[x].ondblclick = completeTask;
		}
	}
};