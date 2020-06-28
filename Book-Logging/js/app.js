// JQuery to initialize the select feature.
$(document).ready(function () {
  $('select').formSelect();
});

class Book {

  constructor(title, author, genre, bookType) {

    this.title = title;
    this.author = author;
    this.genre = genre;
    this.bookType = bookType;
  }
}


class UI {

  // Add book to list
  addBookToList(book) {

    const list = document.getElementById('book-list');

    // Create a tr element
    const tr = document.createElement('tr');
    tr.className = "booklist";

    // Insert columns
    tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.genre}</td>
    <td>${book.bookType}</td>
    <td><a class="delete-item secondary-content modal-trigger" href = "#modal1"><i class="fa fa-remove"></i></a></td>
    `;

    list.appendChild(tr);
  }

  // Show Alert function
  showAlert(message, className) {

    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add Text Node
    div.appendChild(document.createTextNode(message));
    // Get parent element
    const parent = document.querySelector('#parent');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    parent.insertBefore(div, form);
    // Timeout after 3s
    setTimeout(function () {

      document.querySelector('.alert').remove();
    }, 3000);

  }




  // Clear fields
  clearFields() {

    // document.getElementById('title').value = '';
    // document.getElementById('author').value = '';
    // document.getElementById('genre').value = '';
    // document.getElementById('book-type').selectedIndex = 0;

    document.getElementById('book-form').reset();
  }

  // triggerModal(div) {

  //   $(document).ready(function () {
  //     $('.modal').modal();
  //   });
  // }


}


// Class for Local Storage
class Store {

  static getBooks() {

    let books;
    if(localStorage.getItem('books') === null) {

      books = [];
    } else {

      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {

    const books = Store.getBooks();

    books.forEach(function(book) {

      const ui = new UI();

      // Add Book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {

    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {

    const books = Store.getBooks();

    // Remove Book from LS
    books.forEach(function (book, index) {

      if(book.title.toLowerCase() === title.toLowerCase()) {

        books.splice(index, 1);
        // console.log('Equal');
      }

      // Set Local Storage
      localStorage.setItem('books', JSON.stringify(books));

    });
    
  }







}



// DOM Load EVENT
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners

// Add a book
document.getElementById('book-form').addEventListener('submit', function(e) {

  // Get values from form
  const title = document.getElementById('title').value,
  author = document.getElementById('author').value,
  genre = document.getElementById('genre').value,
  bookType = document.getElementById('book-type').value;

  // console.log(title, author, genre, bookType);

  // Instantiating book object
  const book = new Book(title, author, genre, bookType);

  // Instantiating UI object
  const ui = new UI();

  // Validating all fields

  if(title === '' || author === '' || genre === '' || bookType === '') {

    ui.showAlert('Please fill in all fields', 'error');

  } else {

    // Add Book to the list
    ui.addBookToList(book);

    // Add to Local Storage
    Store.addBook(book);

    // Show Success alert 
    ui.showAlert('Congratulations BookNerd!!, your book has been added to the list successfully', 'success');

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();

});


// Delete a Book
document.getElementById('book-list').addEventListener('click', deleteBook);


// Delete a book
function deleteBook(e) {

  // Instantiate UI object
  const ui = new UI();

  if (e.target.parentElement.classList.contains("delete-item")) {

    // const div1 = document.createElement("div");
    // div1.setAttribute("id", "modal1");
    // div1.className = "modal";
    // const div2 = document.createElement("div");
    // div2.className = "modal-content";
    // const p = document.createElement("p");
    // const h4 = document.createElement("h4");
    // const h4text = document.createTextNode('DELETE CONFIRMATION');
    // h4.appendChild(h4text);
    // const ptext = document.createTextNode('Are you sure you want to REMOVE THIS BOOK!!!??');
    // p.appendChild(ptext);
    // div2.appendChild(h4);
    // div2.appendChild(p);
    // div1.appendChild(div2);
    // const div3 = document.createElement("div");
    // div3.className = "modal-footer";
    // const a = document.createElement("a");
    // a.classList.add("modal-close", "waves-effect", "waves-pink", "btn-flat");
    // const atext = document.createTextNode('Agree');
    // a.appendChild(atext);
    // a.setAttribute("href", "#!");
    // div3.appendChild(a);
    // div1.appendChild(div3);
    
    // console.log(div1);
    // ui.triggerModal(div1);


    if (confirm("Are you sure you want to REMOVE THIS BOOK!!!??")) {
      e.target.parentElement.parentElement.parentElement.remove();

      // Show message
      ui.showAlert('I don\'t know why you did this but your book has been removed from the list', 'deletedBook');
    } else {

      // Show message
      ui.showAlert('I\'m happy and glad you decided not to delete the book.', 'success');
    }

    
  }

  // Remove from Local Storage
  Store.removeBook(e.target.parentElement.parentElement.parentElement.firstElementChild.textContent);
  



  e.preventDefault();
}


// Filter Books Event
const filter = document.getElementById('search');

filter.addEventListener('keyup', filterBooks);

// Filter Books function

function filterBooks(e) {

  const text = e.target.value.toLowerCase();
  // console.log(text);

  document.querySelectorAll('.booklist').forEach(function(book) {

    const title = book.firstElementChild.textContent;
    // console.log(title);
    const author = book.firstElementChild.nextElementSibling.textContent;
    // console.log(author);
    const genre = book.firstElementChild.nextElementSibling.nextElementSibling.textContent;
    // console.log(genre);
    const type = book.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
    // console.log(type);


    if( (title.toLowerCase().indexOf(text) != -1) || (author.toLowerCase().indexOf(text) != -1) || (genre.toLowerCase().indexOf(text) != -1) || (type.toLowerCase().indexOf(text) != -1) ) {

      book.style.display = 'block';

    } else {

      book.style.display = 'none';

    }


  });





}


