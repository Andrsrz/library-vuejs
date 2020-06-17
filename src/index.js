import Vue from 'vue';
import './style/style.css';

const Index = (() => {
	const body = document.body;

	const dataBinding = () => {
		let container = document.createElement("div");
		container.id = "root0";
		let input = document.createElement("input");
		input.type = "text";
		input.id = "input";
		let p = document.createElement("p");
		p.innerHTML = "The value is : {{ message }}";
		input.setAttribute("v-model", "message");
		container.appendChild(input);
		container.appendChild(p);
		body.appendChild(container);

		new Vue({
			el: '#root0',
			data: {
				message: 'Hello, Vue!'
			}
		});
	}

	const workingWithLists = () => {
		let container = document.createElement("div");
		container.id = "root1";
		let uList = document.createElement("ul");
		let element = document.createElement("li");
		element.setAttribute("v-for", "game in games");
		element.innerHTML = "{{ game }}";
		let input = document.createElement("input");
		input.type = "text";
		input.setAttribute("v-model", "newGame");
		let button = document.createElement("button");
		button.innerHTML = "Add Game";
		button.setAttribute("v-on:click", "addGame");
		uList.appendChild(element);
		container.appendChild(uList);
		container.appendChild(input);
		container.appendChild(button);
		body.appendChild(container);

		new Vue({
			el: '#root1',
			data: {
				games: ['The Legend of Zelda', 'The Binding of Isaac', 'Minecraft', "Don't Starve", 'Enter the Gungeon'],
				newGame: '',
			},
			methods: {
				addGame(){
					this.games.push(this.newGame);
					this.newGame = '';
				}
			}
		});
	}

	const styles = () => {
		let container = document.createElement("div");
		container.id = "root2";
		let element = document.createElement("h1");
		element.setAttribute("v-bind:class", "className0");
		element.innerHTML = "Hello, Vue!";
		let button = document.createElement("button");
		button.setAttribute("v-bind:class", "{ 'is-loading': isLoading }");
		button.setAttribute("v-on:click", "toggleClass");
		button.innerHTML = "Click Me";
		container.appendChild(element);
		container.appendChild(button);
		body.appendChild(container)

		new Vue({
			el: '#root2',
			data: {
				className0: 'color-red',
				isLoading: false
			},
			methods: {
				toggleClass(){
					this.isLoading = true
				}
			}
		});
	}

	const render = () => {
		dataBinding();
		workingWithLists();
		styles();
	}

	return { render };
})();

Index.render();
