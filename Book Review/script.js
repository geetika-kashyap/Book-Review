const bookListElement = document.getElementById('bookList');
const addButton = document.getElementById('addButton');
const addForm = document.getElementById('addForm');
const submitButton = document.getElementById('submitButton');
let books = [];

// Fetch books from API
async function fetchBooks() {
    try {
        const response = await fetch('https://api.publicapis.org/entries');
        if (!response.ok) {
            throw new Error(`Failed to fetch books. Status: ${response.status}`);
        }
        const data = await response.json();
        return data.entries.slice(0, 10);
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}


// Display books
function displayBooks() {
    books.sort((a,b)=>b.votes-a.votes);
    bookListElement.innerHTML = '';
    books.forEach((book, index) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <h3><strong>Book Name:</strong> ${book.API}</h3>
            <p><strong>Description:</strong> ${book.Description}</p>
            <p><strong>Author:</strong> ${book.Auth}</p>
            <p><strong>Votes:</strong> ${book.votes}</p>
            <div class="book-actions">
                <button class="vote-up">Vote Up</button>
                <button class="vote-down">Vote Down</button>
                <button class="delete">Delete</button>
            </div>
        `;
        bookElement.querySelector('.vote-up').addEventListener('click', () => voteUp(index));
        bookElement.querySelector('.vote-down').addEventListener('click', () => voteDown(index));
        bookElement.querySelector('.delete').addEventListener('click', () => deleteBook(index));
        bookListElement.appendChild(bookElement);
    });
}

// Add book
function addBook() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const genreInput = document.getElementById('genre');
    
    const newBook = {
        API: titleInput.value,
        Description: authorInput.value,
        Auth: genreInput.value,
        votes: 0,
    };

    books.push(newBook);
    displayBooks();

    titleInput.value = '';
    authorInput.value = '';
    genreInput.value = '';
}

// Event listener for add button
addButton.addEventListener('click', () => {
    addForm.style.display = 'block';
});

// Event listener for submit button
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    addBook();
    addForm.style.display = 'none';
});

// Vote Up function
function voteUp(index) {
    books[index].votes++;
    displayBooks();
}

// Vote Down function
function voteDown(index) {
    books[index].votes--;
    displayBooks();
}

// Delete Book function
function deleteBook(index) {
    books.splice(index, 1);
    displayBooks();
}



// Fetch books and display them initially
(async () => {
  books = await fetchBooks();
  books.forEach(book => {
      book.votes = 0; // Initialize votes for each book fetched from API
  });
  displayBooks();
})();

