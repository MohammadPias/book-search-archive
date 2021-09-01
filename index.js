const loadBooks = async () => {
    const inputField = document.getElementById('input-field');
    const InnerValue = inputField.value;
    inputField.value = '';

    const url = `http://openlibrary.org/search.json?q=${InnerValue}`
    const res = await fetch(url);
    const data = await res.json();
    displayBooks(data.docs.slice(0, 20));
};
const displayBooks = books => {
    const booksArea = document.getElementById('books-area');
    books.forEach(book => {
        if (book.hasOwnProperty('publisher') === true) {
            const div = document.createElement('div');
            div.innerHTML = `
                <span class="fw-bold fs-5">${book.title}</span><span class="fst-italic fs-6">     ${book.author_name}</span>
                <p>Publisher: ${book.publisher[0]}</p><p>First Publish Year: ${book.publish_year[0]}</p>
                <p>Total Result: </p>
            `;
            booksArea.appendChild(div);
        }
        else {

        }
    });
}