// src/App.jsx
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import PhotoCard from './components/PhotoCard';
import { fotos } from './data/database';

function App() {
    const [busca, setBusca] = useState('');

    // Lógica de Filtragem:
    // Filtra o array original baseado no texto digitado (case insensitive)
    const fotosFiltradas = fotos.filter((foto) =>
        foto.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="container">
            <Header />

            <SearchBar termoBusca={busca} setTermoBusca={setBusca} />

            <main className="photo-grid">
                {/* Verifica se existem fotos após o filtro */}
                {fotosFiltradas.length > 0 ? (
                    fotosFiltradas.map((foto) => (
                        <PhotoCard
                            key={foto.id}
                            nome={foto.nome}
                            url={foto.url}
                        />
                    ))
                ) : (
                    <div className="no-results">
                        <p>Nenhuma foto encontrada para "{busca}"</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;