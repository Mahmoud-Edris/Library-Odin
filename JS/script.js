let library = [];
const container = document.querySelector(".container");
const addButton = document.querySelector(".add-button");
const counter = document.querySelector(".counter");

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.status = "Unread";
  }
  toggleButton() {
    this.status = this.status === "Read" ? "Unread" : "Read";
    return this.status;
  }
}


const addBook = (t, a, p) => {
  let newBook = new Book(t, a, p);
  library.push(newBook);
};

const showBooks = (arr) => {
  container.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.innerHTML = `
    <h4>${arr[i].title}</h4>
    <p>${arr[i].author}</p>
    <p>${arr[i].pages}</p>
    <button class="removeButton" data-id="${arr[i].id}">Remove</button>
    <button class="toggle ${arr[i].status === "Read" ? "green" : "red"}" data-id="${arr[i].id}">${arr[i].status}</button>
    `;
    let image = document.createElement("div");
    image.textContent = "Book Picture";
    bookCard.appendChild(image);
    container.appendChild(bookCard);
  }
  counter.textContent = `Current Number Of Books: ${arr.length}`;
};

addButton.addEventListener("click", (e) => {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const check = title.value && author.value && pages.value;
  if (!check) {
    return;
  } else {
    addBook(title.value, author.value, pages.value);
    showBooks(library);
  }
});

container.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("removeButton")) {
    let index = library.findIndex((item) => item.id === e.target.dataset.id);
    library.splice(index, 1);
    showBooks(library);
  } else if (e.target.classList.contains("toggle")) {
    let obj = library.find((item) => item.id === e.target.dataset.id);
    e.target.textContent = obj.toggleButton();
    e.target.classList.toggle("green");
    e.target.classList.toggle("red");
  }
});
