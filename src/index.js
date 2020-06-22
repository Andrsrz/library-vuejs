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
				isVisible: false,
				title: 'Add Book',
				nesbtnClass: 'nes-btn',
				typebtnClass: 'is-primary',
			}
		},
		template: `
			<div class="header">
				<button type="button" :class="[nesbtnClass, typebtnClass]" @click="renderAddBook">{{ title }}</button>
				<br><br>
				<form-add-book v-show="isVisible"></form-add-book>
			</div>
		`,
		methods: {
			renderAddBook(){
				if(this.isVisible == false){
					this.isVisible = true;
					this.title = 'X';
					this.typebtnClass = 'is-error';
				}else{
					this.isVisible = false;
					this.title = 'Add Book';
					this.typebtnClass = 'is-primary';
				}
			}
		}
	});

	Vue.component('form-add-book', {
		data() {
			return {
				title: '',
				author: '',
				pages: 1,
				read: false
			}
		},
		template: `
			<form class="form">
				<div class="nes-field">
					<label for="title">Title</label>
					<input type="text" id="title" class="nes-input" v-model="title" required>
				</div>
				<div class="nes-field">
					<label for="author">Author</label>
					<input type="text" id="author" class="nes-input" v-model="author" required>
				</div>
				<div class="nes-field">
					<label for="pages">Pages</label>
					<input type="number" id="pages" class="nes-input" min="1" v-model.number="pages" required>
				</div>
				<div class="nes-field submit-button-container">
					<label>
						<input type="checkbox" class="nes-checkbox" v-model="read" checked />
						<span>Read It?</span>
					</label>
					<button @click="addBook" type="button" class="nes-btn is-success submit-button">Add</button>
				</div>
			</form>
		`,
		methods: {
			addBook(){
				if(this.title != '' && this.author != '' && this.pages > 1){
					const myBook = new Book(this.title, this.author, this.pages, this.read);
					myLibrary.addBook(myBook);
					this.clearInputs();
				}else{
					alert("Fill all required fields");
				}
			},
			clearInputs(){
				this.title = '';
				this.author = '';
				this.pages = 1;
				this.read = false;
			}
		}
	});

	Vue.component('book', {
		props: {
			book: Object,
			index: Number
		},
		data() {
			return {
			};
		},
		template: `
			<div class="book nes-container is-rounded">
				<slot></slot>
				<span>
					<button type="button" class="nes-btn is-warning" @click="changeRead">Read?</button>
					<button type="button" class="nes-btn is-error" @click="deleteBook">Delete</button>
				</span>
			</div>
		`,
		methods: {
			changeRead(){
				if(this.book.read == false)
					this.book.read = true;
				else
					this.book.read = false;
			},
			deleteBook(){
				myLibrary.books.splice(this.index, 1);
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
			<div class="library">
				<book v-for="(book, index) in books" :book="book" :index="index">
					{{ book.info() }}
				</book>
			</div>
		`,
		methods: {
		}
	});

	const render = () => {
		new Vue({
			el: '#main',
			data: {
			}
		});
	}

	return { render };
})();

Index.render();
