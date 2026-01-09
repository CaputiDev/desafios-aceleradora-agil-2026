import React from 'react';

const SearchBar = ({ termoBusca, setTermoBusca }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Pesquise por uma foto(Autor)..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
            />
            <button aria-label="Buscar">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;