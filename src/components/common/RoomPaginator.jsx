/* eslint-disable */
import React from 'react';

const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {
    //Array.from need two parameters, in this case we only need one    from(arraylike) arraylike = {length:totalPages} arraylike cant use map foreach slice
    const pageNumbers = Array.from({length:totalPages}, (_, i)=> i +1)

    return (
        <nav aria-label="Page navigation">
            <ul className='pagination justify-content-center'>
                {pageNumbers.map((pageNumber) => (
                        <li
                            key={pageNumber}
                            className={`page-item ${currentPage === pageNumber ? "active": "" }`}
                        >
                        <button className="page-link" onClick={()=> onPageChange(pageNumber)}>
                            {pageNumber}
                        </button>
                    </li>
                ))}

            </ul>
        </nav>
    );
};

export default RoomPaginator;
