import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import PhotoCard from './components/PhotoCard';

function App() {
    const [fotos, setFotos] = useState([]);
    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const buscarFotos = async () => {
            try {
                const resposta = await fetch('https://picsum.photos/v2/list?page=1&limit=1000');
                const dados = await resposta.json();

                const dadosFormatados = dados.map((foto) => ({
                    id: foto.id,
                    nome: foto.author,
                    url: `https://picsum.photos/id/${foto.id}/1200/800`
                }));

                setFotos(dadosFormatados);
            } catch (erro) {
                console.error("Erro ao buscar fotos:", erro);
                alert("Erro ao carregar fotos. Verifique sua internet.");
            } finally {
                setCarregando(false);
            }
        };

        buscarFotos();
    }, []);

    const fotosFiltradas = fotos.filter((foto) =>
        foto.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="container">
            <Header />

            <SearchBar termoBusca={busca} setTermoBusca={setBusca} />

            <main className="photo-grid">
                {carregando ? (
                    <div className="loading">Carregando galeria...</div>
                ) : (
                    <>
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
                                <p>Nenhum fotógrafo encontrado com o nome "{busca}"</p>
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;