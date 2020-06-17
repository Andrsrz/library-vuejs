import Vue from 'vue';
import './style/style.css';

const Index = (() => {
	const dataBinding = () => {
		new Vue({
			el: '#root0',
			data: {
				message: 'Hello, Vue!'
			}
		});
	}

	const workingWithLists = () => {
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
		new Vue({
			el: '#root2',
			data: {
				className: 'color-red',
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
