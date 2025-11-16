import './BookCard.css';
import { useEffect, useState } from "react";

export default function BookCard({ book }) {
    const [isOpen, setIsOpen] = useState(false);

    // useEffect для добавления/удаления класса
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        // очистка на случай, если компонент размонтируется
        return () => document.body.classList.remove("no-scroll");
    }, [isOpen]);


    return (
        <>
            <div className="book-card">
                <img src={book.image} alt="Book Image" onClick={() => setIsOpen(true)} />
                <h3 onClick={() => setIsOpen(true)}>{book.title}</h3>
                <div className="card-book-info" onClick={() => setIsOpen(true)}>
                    <p>{book.author}</p>
                    <p>{book.year}</p>
                </div>
                <div className="card-buttons">
                    <button
                        className="save-card-button"
                        onClick={(e) => {
                            e.stopPropagation(); // останавливаем всплытие
                            saveBook(book);       // твоя функция сохранения
                        }}
                    >Save</button>

                    <button
                        className="reserve-card-button"
                        disabled={!book.available}
                        onClick={(e) => {
                            e.stopPropagation(); // чтобы Reserve тоже не открывал модалку случайно
                            reserveBook(book);   // твоя функция резервирования
                        }}
                    >
                        {book.available ? "Reserve" : "All Reserved"}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="modal" onClick={() => setIsOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={book.image} alt="Book Image" />
                        
                        <div className="modal-text">
                            <h2>{book.title}</h2>
                            <p><strong>Author: </strong>{book.author}</p>
                            <p><strong>Year: </strong>{book.year}</p>
                            <p><strong>Description: </strong>{book.description}</p>
                            <button onClick={() => setIsOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
