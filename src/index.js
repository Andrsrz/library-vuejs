import Vue from 'vue';
import { Library } from './library.js';
import { Book } from './book.js';
import "nes.css/css/nes.min.css";
import './style/style.css';

const Index = (() => {
	const myLibrary = new Library();
	const myBook = new Book("The Hobbit", "J.R.R. Tolkien", "300", true);
	myLibrary.addBook(myBook);

	Vue.component('library-header', {
		props: [],
		data(){
			return{
				isVisible: false
			}
		},
		template: `
			<div class="header">
				<button type="button" class="nes-btn is-primary" @click="renderAddBook">Add Book</button>
				<form-add-book v-show="isVisible"></form-add-book>
			</div>
		`,
		methods: {
			renderAddBook(){
				console.log("render add book");
				if(this.isVisible == false)
					this.isVisible = true;
				else
					this.isVisible = false;
			}
		}
	});

	Vue.component('form-add-book', {
		props: [],
		data() {
			return {
			};
		},
		template: `
			<form>
				<div class="nes-field">
					<label for="name_field">Your name</label>
					<input type="text" id="name_field" class="nes-input">
				</div>
			</form>
		`,
		methods: {
		}
	});

	Vue.component('book', {
		props: [],
		data() {
			return {
			};
		},
		template: `
			<div class="book nes-container is-rounded">
				<slot></slot>
				<span>
					<button type="button" class="nes-btn is-primary" @click="changeRead">Read?</button>
					<button type="button" class="nes-btn is-warning" @click="deleteBook">Delete</button>
				</span>
			</div>
		`,
		methods: {
			changeRead(){
				alert("read");
			},
			deleteBook(){
				alert("delete");
			}
		}
	});

	Vue.component('library', {
		props: [],
		data() {
			return {
				books: myLibrary.books
			};
		},
		template: `
			<div>
				<book v-for="book in books">{{ book.info() }}</book>
			</div>
		`,
		methods: {
		}
	});

	const render = () => {
		new Vue({
			el: '#main',
			data: {
				books: myLibrary.books
			}
		});
	}

	return { render };
})();

Index.render();
