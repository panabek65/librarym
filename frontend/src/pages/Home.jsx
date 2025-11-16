import { useState } from "react";
import booksData from "../data/books.json";
import Header from "../components/Header";
import SlideShow from "../components/SlideShow";
import SearchBarFilter from "../components/SearchBarFilter";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer";
import './Home.css'
// import Banner from "../components/Banner";

export default function Home() {
  const [books, setBooks] = useState(booksData);

  const handleSearch = (query) => {
    const filtered = booksData.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    setBooks(filtered);
  };

  return (
    <div className="home">
      <Header />
      {/* <Banner /> */}
      <SlideShow />

      <h2 className="grid-title">Available Books</h2>

      <SearchBarFilter onSearch={handleSearch} />

      <div className="book-grid">
        {books.map((book) => (
          <BookCard book={book} />
        ))}
      </div>

      <Footer />
    </div>
  );
}