import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import PhotoCard from './components/PhotoCard';

function App() {
    const [fotos, setFotos] = useState([]);
    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [pagina, setPagina] = useState(1);
    const [mostrarBotao, setMostrarBotao] = useState(false);

    const carregarFotos = useCallback(async (numPagina) => {
        try {
            setCarregando(true);
            const resposta = await fetch(`https://picsum.photos/v2/list?page=${numPagina}&limit=30`);
            const dados = await resposta.json();

            const dadosFormatados = dados.map((foto) => ({
                id: foto.id,
                nome: foto.author,
                url: `https://picsum.photos/id/${foto.id}/800/533`
            }));

            setFotos((prevFotos) => {
                const novasFotos = dadosFormatados.filter(
                    nova => !prevFotos.some(existente => existente.id === nova.id)
                );
                return [...prevFotos, ...novasFotos];
            });

        } catch (erro) {
            console.error("Erro ao buscar fotos:", erro);
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregarFotos(1);
    }, [carregarFotos]);

    useEffect(() => {
        if (pagina > 1) {
            carregarFotos(pagina);
        }
    }, [pagina, carregarFotos]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setMostrarBotao(true);
            } else {
                setMostrarBotao(false);
            }

            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
                !carregando
            ) {
                setPagina((prevPagina) => prevPagina + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [carregando]);

    const voltarAoTopo = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const fotosFiltradas = fotos.filter((foto) =>
        foto.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="container">
            <Header />

            <SearchBar termoBusca={busca} setTermoBusca={setBusca} />

            <main className="photo-grid">
                {fotosFiltradas.length > 0 ? (
                    fotosFiltradas.map((foto) => (
                        <PhotoCard
                            key={foto.id}
                            nome={foto.nome}
                            url={foto.url}
                        />
                    ))
                ) : (
                    !carregando && (
                        <div className="no-results">
                            <p>Nenhum fotógrafo encontrado com o nome "{busca}"</p>
                        </div>
                    )
                )}
                
                {carregando && <div className="loading">Carregando mais fotos...</div>}
            </main>

            <Footer />
            
            {mostrarBotao && (
                <button onClick={voltarAoTopo} className="btn-voltar-topo">
                    ⬆
                </button>
            )}
        </div>
    );
}

export default App;