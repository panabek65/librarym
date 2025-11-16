import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import FilterSort from "../assets/FilterSort.svg";
import './SearchBarFilter.css';

export default function SearchBarFilter({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or author..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <button><FaSearch /></button>        {/* Dummy Button */}
        <button className='filter' onClick={() => setIsOpen(true)}>
          <img src={FilterSort} alt="Filter and Sort" />
        </button>
      </div>

      {isOpen && (
        <div className="modal" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Apply filters or sort</h2>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}