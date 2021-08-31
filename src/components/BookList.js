import React from 'react';
import Swal from 'sweetalert2';

export const BookList = ({books, setListUpdated, updateBook}) => {

    const handleDelete = (id) => {

        //Alert to make sure you want to delete a book
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
            
                fetch('https://jossiel-library-api.herokuapp.com/books/' + id, {
                    method: 'DELETE'
                }).then(res => res.text())
                .then((res) => {
                    console.log(res);
                    Swal.fire(
                        'Deleted!',
                        'Your book has been deleted.',
                        'success'
                    )
                    setListUpdated(true);
                });
            }
        })
    }

    return (
        <table className="table table-dark table-striped">
            <thead style={{textAlign:"center"}}>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Edition</th>
                    <th>Opt</th>
                </tr>
            </thead>
            <tbody style={{textAlign:"center"}}>
                {
                    books.map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.edition}</td>
                            <td>
                                <button 
                                    style={{width:"70px", marginBottom:"5px"}}
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(book.id)}
                                >
                                    Delete
                                </button>
                                <button 
                                    style={{width:"70px"}}
                                    className="btn btn-primary"
                                    onClick={() => updateBook(book)}    
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    )
}
