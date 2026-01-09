import React from 'react';

// Recebe o valor atual e a função para atualizar (props)
const SearchBar = ({ termoBusca, setTermoBusca }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Pesquise por uma foto..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
            />
            <button onClick={() => console.log("Busca realizada!")} aria-label="Buscar">
                🔍
            </button>
        </div>
    );
};

export default SearchBar;