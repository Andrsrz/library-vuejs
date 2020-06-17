import Vue from 'vue';

const Index = (() => {
	const body = document.body;

	const dataBinding = () => {
		let container = document.createElement("div");
		container.id = "root";
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
			el: '#root',
			data: {
				message: 'Hello, Vue!'
			}
		});
	}

	const render = () => {
		dataBinding();
	}

	return { render };
})();

Index.render();
