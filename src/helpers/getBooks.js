
export const getBooks = () => {
    
    const books = fetch('https://jossiel-library-api.herokuapp.com/books').then(res => res.json());

    return books;
}
