import React, { useEffect, useState } from 'react'
import { BookForm } from './BookForm';
import { BookList } from './BookList'
import { Navbar } from './Navbar'
import { getBooks } from '../helpers/getBooks';


export const LibraryApp = () => {

    const [book, setBook] = useState({
        title: '',
        author: '',
        edition: 0
    });
    const [books, setBooks] = useState([]);
    const [edit, setEdit] = useState(false);

    const [listUpdated, setListUpdated] = useState(false);

    useEffect(() => {
        
        console.log('useEffect');
        getBooks().then(res => setBooks(res));
        setListUpdated(false);
        setEdit(false);

    }, [listUpdated]);

    const updateBook = (bookSelected) => {
        setBook(bookSelected);
        setEdit(true);
    }

    console.log('hola')

    return (
        <>
            <Navbar brand="Library App"/>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-7" >
                        <h2 style={{textAlign:"center", marginBottom:"15px"}}>
                            Book List
                        </h2>
                        <BookList 
                            books={books}
                            setListUpdated={setListUpdated}
                            updateBook={updateBook}
                        />
                    </div>
                    <div className="col-lg-5">
                        <h2 style={{textAlign:"center"}}>Book Form</h2>
                        <BookForm 
                            book={book} 
                            setBook={setBook} 
                            setListUpdated={setListUpdated}
                            edit={edit}
                        />
                    </div>
                </div>  
            </div>
        </>
    )
}
