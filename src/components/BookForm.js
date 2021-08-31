import React from 'react';
import Swal from 'sweetalert2';

export const BookForm = ({book, setBook, setListUpdated, edit}) => {

    const handleInputChange = ({target}) => {
        setBook({
            ...book,
            [target.name]: target.value
        });
    }

    let {title, author, edition} = book;

    const handleSubmit = (e) => {
        e.preventDefault();

        //validations
        edition = parseInt(edition, 10);

        if(title === '' || author === '' || edition <= 0){
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required'
            })
            return;
        }

        //query

        if(!edit){
            console.log('add');
            fetch('https://jossiel-library-api.herokuapp.com/books', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(book)
            })
            .then(res => res.text())
            .then((res) => {
                console.log(res);
                if(res === 'The book already exists'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res
                    });
                }else{
                    Swal.fire('Saved!', '', 'success');
                    setListUpdated(true);
                }
            });
        }else{
            console.log('edit');
            fetch('https://jossiel-library-api.herokuapp.com/books/'+book.id, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(book)
            })
            .then(res => res.text())
            .then((res) => {
                console.log(res);
                if(res === 'The book already exists'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res
                    });
                }else{
                    Swal.fire('Updated!', '', 'success');
                    setListUpdated(true);
                }
            });

        }
        
        setBook({
            title: '',
            author: '',
            edition: 0
        });

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input 
                    type="text" 
                    placeholder="Title" 
                    name="title"
                    value={book.title}
                    onChange={handleInputChange}
                    className="form-control"
                /> 
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">
                    Author
                </label>
                <input 
                    type="text" 
                    placeholder="Author"
                    name="author"
                    value={book.author}
                    onChange={handleInputChange}
                    className="form-control"
                /> 
            </div>
            <div className="mb-3">
                <label htmlFor="edition" className="form-label">
                    Edition
                </label>
                <input 
                    type="number" 
                    min="1"
                    name="edition" 
                    value={book.edition}
                    onChange={handleInputChange}
                    className="form-control"
                /> 
            </div>
            <div className="d-grid gap-2">
                {
                    edit ? 
                    (<button 
                        type="submit" className="btn btn-primary"
                    > 
                        Edit
                    </button>)
                    : 
                    (<button 
                        type="submit" className="btn btn-primary"
                    > 
                        Add
                    </button>)
                }
                
            </div>

        </form>
    )
}
