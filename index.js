const loadBooks = async () => {
    const errorDiv = document.getElementById('error-div');
    const inputField = document.getElementById('input-field');
    const InnerValue = inputField.value;
    inputField.value = '';

    if(InnerValue === ''){
        errorDiv.innerText = 'search field can not be empty'
    }
    else{
        const url = `https://openlibrary.org/search.json?q=${InnerValue}`
        const res = await fetch(url);
        const data = await res.json();
        displayBooks(data.docs.slice(0, 40));
        if(data.numFound === 0){
            errorDiv.innerHTML = `<h5>Search result not found</h5>`;
        }
        else{
            errorDiv.innerHTML = ''; 
        }
    };
};
const displayBooks = books => {
    const errorDiv = document.getElementById('error-div');
    
    const booksArea = document.getElementById('books-area');
    const searchArea = document.getElementById('search-result');
    const searchResult = document.createElement('h5');
    searchResult.innerText = `Total search result: ${books.length}`;
    booksArea.textContent = '';
    searchArea.textContent = '';
    errorDiv.textContent = '';
    books.forEach(book => {
        if (book.hasOwnProperty('publisher') === true) {
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
                <div class="card h-100">
                    <div h-100>
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    </div>
                    <div class="card-footer">
                            <h5>${book.title}<small class="fst-italic fs-6">    ${book.author_name}</small></h5>
                            <p>Publisher: ${book.publisher[0]}</p>
                            <p>First Publish Year: ${book.publish_year[0]}</p>
                    </div>
                </div>
            `;
            booksArea.appendChild(div);
            searchArea.appendChild(searchResult);
        }
        else {

        };
    });
}