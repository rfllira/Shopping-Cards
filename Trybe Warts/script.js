/* eslint-disable no-undef */
/* //desabilitar o botão Enviar */

const vericicacao = () => {
	const email = document.getElementById("email").value;
	const senha = document.getElementById("password").value;
	if (email === "tryber@teste.com" && senha === "123456") alert("Olá, Tryber!"); 
	else alert("Email ou senha inválidos.");
};

const botaoEntrar = document.getElementById("entrar");
botaoEntrar.addEventListener("click", vericicacao);
/* Função de Enviar. Requisito 16 precisa estar marcado para habilitar o botão enviar */
const marca = document.querySelector("#agreement");
marca.addEventListener("click", () => {
	/* event.preventDefault(); */
	if (marca.checked) document.querySelector("#submit-btn").disabled = false;
	else  document.querySelector("#submit-btn").disabled = true;
});

/* Função mostra a quantidade de letras restantes no textarea */
const conta = document.querySelector("#textarea");
conta.addEventListener("keyup", () => {
	const number = document.querySelector("#counter");
	number.innerHTML = 500 - conta.value.length;
});
