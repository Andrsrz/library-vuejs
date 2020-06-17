import Vue from 'vue';

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

	const render = () => {
		dataBinding();
		workingWithLists();
	}

	return { render };
})();

Index.render();
