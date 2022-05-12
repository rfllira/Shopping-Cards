/* eslint-disable no-undef */
const colorDivs = document.getElementById("color-palette").children;
const btnClear = document.getElementById("clear-board");
const btnGenBoard = document.getElementById("generate-board");
const input = document.getElementById("board-size");
let pixels = document.querySelectorAll(".pixel");
let color = "rgb(0,0,0)";

function selectColor(event) {
	const div = event.target;
	const cssObj = window.getComputedStyle(div, null);
	color = cssObj.getPropertyValue("background-color");

	if (div.classList[div.classList.length - 1] !== "selected") {
		for (let x = 0; x < colorDivs.length; x += 1) {
			colorDivs[x].classList.remove("selected");
		}
		div.classList.add("selected");
	}
}

function changeColor(event) {
	const elem = event.target;

	elem.style.backgroundColor = color;
}

for (let x = 0; x < pixels.length; x += 1) {
	pixels[x].onclick = changeColor;
}

for (let x = 0; x < colorDivs.length; x += 1) {
	colorDivs[x].onclick = selectColor;
}

function clearBoard() {
	for (let x = 0; x < pixels.length; x += 1) {
		pixels[x].style.backgroundColor = "white";
	}
}

btnClear.onclick = clearBoard;

function verifValue(value) {
	let x = value;

	if (x < 5) {
		x = 5;
	} else if (x > 50) {
		x = 50;
	}

	return x;
}

function genLines(value, dad) {
	const newValue = verifValue(value);

	for (let x = 0; x < newValue; x += 1) {
		const line = document.createElement("div");
		line.className = "line";
		dad.appendChild(line);

		for (let y = 0; y < newValue; y += 1) {
			const pixel = document.createElement("div");
			pixel.className = "pixel";
			const lines = document.querySelectorAll(".line");
			lines[x].appendChild(pixel);
		}
	}
}

function genBoard() {
	const { value } = input;
	if (value === "") {
		alert("Board inválido!");
		return null;
	}

	const board = document.getElementById("pixel-board");
	board.innerHTML = "";

	genLines(value, board);

	pixels = document.querySelectorAll(".pixel");

	for (let x = 0; x < pixels.length; x += 1) {
		pixels[x].onclick = changeColor;
	}
}

btnGenBoard.onclick = genBoard;

window.onload = () => {
	const colors = document.querySelectorAll(".color");
	for (let x = 1; x < colors.length; x += 1) {
		// * Source: https://css-tricks.com/snippets/javascript/random-hex-color/
		const randomColor = Math.floor(Math.random() * 16777215).toString(16);
		colors[x].style.backgroundColor = `#${randomColor}`;
	}
};