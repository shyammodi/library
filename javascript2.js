// javascript2.js

class Book {
    constructor(title, author, numPages, haveRead)
    {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.haveRead = haveRead;
    }

    info() {
        let infoString = this.title + " by " + this.author + ", " + this.numPages + " pages, ";
        if (this.haveRead) {
            infoString += "read";
        }
        else {
            infoString += "not read yet";
        }
        return infoString;
    }

    toggleRead() {
        this.haveRead = !this.haveRead;
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
        this.openLibrary();
    }

    addBookToLibrary(newBook) {
        this.myLibrary.push(newBook);
    }

    displayBooks() {
        let libraryList = document.querySelector("#libraryList");
        libraryList.innerHTML = "";
        for (let i = 0; i < this.myLibrary.length; i++)
        {
            const nextBook = document.createElement("li");
            nextBook.textContent = this.myLibrary[i].info();

            const toggleRead = document.createElement("button");
            toggleRead.id = "toggle" + i;
            toggleRead.classList.add("toggle");
            if (this.myLibrary[i].haveRead) {
                toggleRead.textContent = "Mark as unread";
            }
            else {
                toggleRead.textContent = "Mark as read";
            }
            nextBook.appendChild(toggleRead);

            const deleteBook = document.createElement("button");
            deleteBook.id = i;
            deleteBook.classList.add("delete");
            deleteBook.textContent = "Delete";
            nextBook.appendChild(deleteBook);

            libraryList.appendChild(nextBook);
        }
        this.updateToggleReadButtons();
        this.updateDeleteButtons();
    }

    openLibrary() {
        const form = document.querySelector("form");
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const title = document.querySelector("#title").value;
                const author = document.querySelector("#author").value;
                const numPages = document.querySelector("#numPages").value;
                const haveRead = document.querySelector("#haveRead").checked;
                this.addBookToLibrary(new Book(title, author, numPages, haveRead));
                form.reset();
                this.displayBooks();
        })
    }

    updateToggleReadButtons() {
        let toggleReadButtons = Array.from(document.querySelectorAll(".toggle"));
        toggleReadButtons.forEach(element => {
            element.addEventListener("click", e => {
                let bookId = e.target.id.substring(6);
                this.myLibrary[bookId].toggleRead();
                this.displayBooks();
            })
        });
    
    }

    updateDeleteButtons() {
        let deleteButtons = Array.from(document.querySelectorAll(".delete"));
        deleteButtons.forEach(element => {
            element.addEventListener("click", e => {
                let bookId = e.target.id;
                this.myLibrary.splice(bookId, 1);
                this.displayBooks();
            })
        });
    
    }

}

const theLib = new Library();
