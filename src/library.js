class Library{
	constructor(books){
		this.books = books ? books : [];
	}

	addBook = (book) => {
		this.books.push(book);
	}
};

export { Library };
