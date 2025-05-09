class Book {
    constructor(name, author, pages, status) {
        this.id = crypto.randomUUID();
        this.name  = name;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    toggleRead() {
        if (this.status === "not read") {
            this.status = "read";
        } else {
            this.status = "not read";
        }

    }
}

const theHobbit = new Book(
    "The Hobbit",
    "J.R.R. Tolkien",
    295,
    "not read"
);

const foundation = new Book(
    "Foundation and Empire",
    "Isaac Asimov",
    288,
    "not read"
);


const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");
const newButton = document.querySelector('dialog + button');
newButton.addEventListener('click', () =>{
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

let myLibrary = [theHobbit, foundation];





function addBookToLibrary(name, author, pages, status) {
    const book = new Book(name, author, pages, status);
    myLibrary.push(book);
}

function displayBooks() {
    const gridContainer = document.querySelector('.grid-container');
    for (const book of myLibrary) {
        createCard(book, gridContainer);
    }
}

function displayNewBook() {
    const gridContainer = document.querySelector('.grid-container');
    const newBook = myLibrary[myLibrary.length-1];
    createCard(newBook, gridContainer);
}

function createCard(book, gridContainer) {
    let card = document.createElement('div');
    for (let prop in book) {
        if (typeof book[prop] !== 'function') {
            let row = document.createElement('div');
            row.innerText = `${prop}: ${book[prop]}`;
            card.appendChild(row);
        }
    }
    const removeButton = document.createElement('button');
    removeButton.setAttribute('type', 'button');
    removeButton.innerText = 'Remove';
    removeButton.classList.add('remove');
    const readToggle = document.createElement("input");
    readToggle.setAttribute('type', 'checkbox');
    readToggle.classList.add('toggle-read');
    if (book.status === 'read') {
        readToggle.checked = true;
    }
    const toggleLabel = document.createElement('label');
    toggleLabel.setAttribute('for', 'toggle-read');
    toggleLabel.innerText = 'Read?';
    card.appendChild(removeButton);
    card.appendChild(toggleLabel);
    card.appendChild(readToggle);
    card.classList.add('card');
    card.setAttribute('data-id', book['id']);
    gridContainer.appendChild(card);
    removeButton.addEventListener('click', removeBook);
    readToggle.addEventListener('click', invokeToggle);

}

const submitButton = document.querySelector('form');
submitButton.addEventListener('submit', (event) =>{
    event.preventDefault();
    const data = new FormData(event.target);
    const details = [...data.entries()];
    const book = addBookToLibrary(details[0][1], details[1][1], details[2][1], details[3][1]);
    const inputs = document.querySelectorAll('form input');
    inputs.forEach((input) => {
        if (input.type != 'submit') {
            input.value = "";
        }
    });
    displayNewBook();
});

displayBooks();

function removeBook(event) {
    console.log("remove button clicked");
    const id = event.target.parentNode.getAttribute('data-id');
    const newLibrary = myLibrary.filter((book) => {
        return book.id !== id;
    });
    myLibrary = newLibrary;
    event.target.parentNode.remove();
}

const removeButtons = document.querySelectorAll('.remove');
removeButtons.forEach((btn) => {
    btn.addEventListener('click', removeBook);
});

const readToggles = document.querySelectorAll('.toggle-read');
readToggles.forEach((t) => {
    t.addEventListener('click', invokeToggle);
});

function invokeToggle(event) {
    const id = event.target.parentNode.getAttribute('data-id');
    const book = myLibrary.filter((b) => b.id === id);
    book[0].toggleRead();
    event.target.previousSibling.previousSibling.previousSibling.innerText = `status: ${book[0].status}`;
}
