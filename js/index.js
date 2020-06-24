const input = document.querySelector(".book-search-input");
const booksList = document.querySelector(".book-search-result");

let booksItem = [];
function fetchBooks(inputValue) {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      booksItem = data.items;
      console.log(booksItem);
      booksList.innerHTML = "";
      booksItem.map((el) => {
        booksList.appendChild(createItem(el.volumeInfo.title));
      });
      if (!booksItem.length) {
        const warning = document.createElement("p");
        warning.classList.add("warning");
        warning.textContent = "Enter correct query!!!";
        booksList.appendChild(warning);
      }
    })
    .catch((err) => {
      const errorTitle = document.createElement("h2");
      errorTitle.classList.add("errorTitle");
      errorTitle.textContent = "Oops, something went wrong";
      booksList.appendChild(errorTitle);
    });
}

function createItem(title) {
  const item = document.createElement("p");
  item.classList.add("item-text");
  item.textContent = title;
  return item;
}
const searchBooks = (e) => {
  const inputValue = input.value;
  if (inputValue.length > 3) setTimeout(() => fetchBooks(inputValue), 3000);
};

input.addEventListener("input", searchBooks);
