import Vue from 'vue';
import { Library } from './library.js';
import { Book } from './book.js';
import "nes.css/css/nes.min.css";
import './style/style.css';

const Index = (() => {
	const myLibrary = new Library();

	Vue.component('library-header', {
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
					saveToStorage();
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

				saveToStorage();
			},
			deleteBook(){
				myLibrary.books.splice(this.index, 1);
				saveToStorage();
			}
		}
	});

	Vue.component('library', {
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
		`
	});

	Vue.component('library-footer', {
		template: `
			<div class="footer">
				<a><i class="nes-icon github is-medium" @click="openGithub" title="Show me the code"></i></a>
			</div>
		`,
		methods: {
			openGithub(){
				window.open("https://github.com/Andrsrz/library-vuejs", "_blank");
			}
		}
	});

	const storageAvailable = (type) => {
		var storage;
		try {
			storage = window[type];
			var x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return e instanceof DOMException && (
				// everything except Firefox
				e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === 'QuotaExceededError' ||
				// Firefox
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
				// acknowledge QuotaExceededError only if there's something already stored
				(storage && storage.length !== 0);
		}
	}

	const checkLocalStorage = () => {
		if(storageAvailable('localStorage')){
			if(getFromStorage()){
			}
		}else {
			alert("WARNING! Your browser doesn't support local storage. To use this app \
				change the browser.");
		}
	}

	const saveToStorage = () => {
		localStorage.setItem('libraryArr', JSON.stringify(myLibrary.books));
		getFromStorage();
	}

	const getFromStorage = () => {
		let storage = false;
		myLibrary.books = [];

		let booksLocalStorage = localStorage.getItem('libraryArr');
		let books = JSON.parse(booksLocalStorage);

		if(books != null){
			for(let i = 0; i < books.length; i++){
				storage = true;
				/* Get attributes from the JSON */
				let book = new Book(books[i].title, books[i].author, books[i].pages, books[i].read);
				myLibrary.books.push(book);
			}
		}

		return storage;
	}

	const render = () => {
		if(checkLocalStorage() == false){
			/* Default Book */
			const myBook = new Book("The Hobbit", "J.R.R. Tolkien", "300", true);
			myLibrary.addBook(myBook);
			saveToStorage();
		}

		new Vue({
			el: '#main'
		});

		new Vue({
			el: '#footer'
		});
	}

	return { render };
})();

Index.render();
