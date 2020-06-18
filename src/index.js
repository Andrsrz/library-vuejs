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

	const computedProperties = () => {
		new Vue({
			el: '#root3',
			data: {
				message: 'Hello, Vue!',
				tasks: [
					{ description: "Play Don't Starve", completed: false },
					{ description: "Learn Vue", completed: false },
					{ description: "Push to Github", completed: true },
					{ description: "Conquer the World", completed: false },
					{ description: "Watch Community", completed: false }
				]
			},
			methods: {
				changeCompletition(task){
					if(task.completed)
						task.completed = false;
					else
						task.completed = true;
				}
			},
			computed: {
				reversedMessage(){
					return this.message.split('').reverse().join('');
				},
				incompletedTasks(){
					return this.tasks.filter(task => !task.completed);
				},
				completedTasks(){
					return this.tasks.filter(task => task.completed);
				}
			}
		});
	}

	Vue.component('task', {
		template: '<li><slot></slot></li>'
	});

	Vue.component('tasks-list', {
		template: `
			<div>
				<task v-for="task in tasks">{{ task.description }}</task>
			</div>
		`,
		data(){
			return {
				tasks: [
					{ description: "Play Don't Starve", completed: false },
					{ description: "Learn Vue", completed: false },
					{ description: "Push to Github", completed: true },
					{ description: "Conquer the World", completed: false },
					{ description: "Watch Community", completed: false }
				]
			}
		}
	});

	Vue.component('message', {
		props: ['title', 'body'],
		data() {
			return {
				isVisible: true
			};
		},
		template: `
			<div class="message" v-show="isVisible">
				<div>
					{{ title }}
					<button type="button" @click="hideModal">x</button>
				</div>
				<div>{{ body }}</div>
			</div>
		`,
		methods: {
			hideModal(){
				this.isVisible = false;
			}
		}
	});

	const components = () => {
		new Vue({
			el: '#root4',
		});
	}

	const render = () => {
		dataBinding();
		workingWithLists();
		styles();
		computedProperties();
		components();
	}

	return { render };
})();

Index.render();
