import { useEffect, useState, useCallback, useMemo, useRef, ChangeEvent } from "react";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

// Interfaces para tipos de dados
interface EditMovie {
  enabled: boolean;
  movieTitle: string;
}

interface Movie {
  title: string;
  poster: string;
  synopsis: string;
  cast: string;
  rating: number;
  category: string;
  premiere: string;
  duration: number;
}

// Componente principal do aplicativo
export default function App() {

  // Efeito para alterar a classe do body ao rolar (scroll)
  useEffect(() => {
    const handleScroll = () => {
      const scrolledDown = window.scrollY > 100; // Altere o valor conforme necessário
      document.body.classList.toggle("scrolled-down", scrolledDown);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  // Refs para elementos no DOM
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  // Ref para controlar o primeiro render
  const firstRender = useRef(true);
  // Estado para controle de dados do formulário
  const [input, setInput] = useState<Movie>({
    title: "",
    poster: "",
    synopsis: "",
    cast: "",
    rating: 0,
    category: "",
    premiere: "",
    duration: 0,
  });

  // Estado para a lista de filmes
  const [movies, setMovies] = useState<Movie[]>([]);

  // Estado para controle de edição de filme
  const [editMovie, setEditMovie] = useState<EditMovie>({
    enabled: false,
    movieTitle: "",
  });

  // Estado para controle do modal de detalhes do filme
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Efeito para carregar filmes do armazenamento local ao iniciar
  useEffect(() => {
    const savedMovies = localStorage.getItem("movieRegister");

    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  // Efeito para salvar filmes no armazenamento local
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("movieRegister", JSON.stringify(movies));
  }, [movies]);

  // Função para salvar as alterações ao editar um filme
  const handleSaveEdit = useCallback(() => {
    const findIndexMovies = movies.findIndex((movie) => movie.title === editMovie.movieTitle);
    const allMovies = [...movies];
    allMovies[findIndexMovies] = input;
    setMovies(allMovies);

    setEditMovie({
      enabled: false,
      movieTitle: "",
    });

    setInput({
      title: "",
      poster: "",
      synopsis: "",
      cast: "",
      rating: 0,
      category: "",
      premiere: "",
      duration: 0,
    });
  }, [movies, editMovie, input]);

  // Função para excluir um filme
  const handleDelete = useCallback((item: Movie) => {
    const removeMovie = movies.filter((movie) => movie.title !== item.title);
    setMovies(removeMovie);
  }, [movies]);

  // Função para rolar até o início do formulário ao editar um filme
  const scrollToTop = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Função para editar um filme
  const handleEdit = useCallback((item: Movie) => {
    setInput(item);
    setEditMovie({
      enabled: true,
      movieTitle: item.title,
    });
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  // Memoização da lista de filmes usando useMemo()
  const memoizedMovies = useMemo(() => {
    return movies;
  }, [movies]);

  // Função para adicionar ou editar um filme ao enviar o formulário
  const handleRegister = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!input.title) return;
    if (editMovie.enabled) {
      e.preventDefault();
      handleSaveEdit();
      return;
    }

    // Limpar inputs após cadastro
    setMovies((prevMovies) => [...prevMovies, input]);
    setInput({
      title: "",
      poster: "",
      synopsis: "",
      cast: "",
      rating: 0,
      category: "",
      premiere: "",
      duration: 0,
    });
  }, [editMovie.enabled, handleSaveEdit, input]);

  // Função para exibir detalhes de um filme
  const handleDetails = useCallback((item: Movie) => {
    setSelectedMovie(item);
    setModalOpen(true);
  }, []);

  // Função para fechar o modal de detalhes
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedMovie(null);
  }, []);

  // Renderização do componente principal
  return (

    <div className="container">
      <div className="form" ref={formRef}>
        <h1>Catálogo de Filmes</h1>

        <label>Título do Filme:</label>
        <input
          type="text"
          placeholder="Digite o título do filme aqui"
          value={input.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({ ...input, title: e.target.value })}
          ref={inputRef}
        />

        <label>URL do Pôster:</label>
        <input
          type="text"
          placeholder="Digite a URL do pôster aqui"
          value={input.poster}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({ ...input, poster: e.target.value })}
        />

        <label>Sinopse:</label>
        <textarea
          placeholder="Digite a sinopse do filme aqui"
          value={input.synopsis}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput({ ...input, synopsis: e.target.value })}
        />

        <label>Elenco:</label>
        <input
          type="text"
          placeholder="Digite o elenco do filme aqui"
          value={input.cast}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({ ...input, cast: e.target.value })}
        />

        <label>Avaliação:</label>
        <input
          type="number"
          placeholder="Digite a avaliação do filme aqui"
          value={input.rating}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({ ...input, rating: parseFloat(e.target.value) })}
        />

        <label>Categoria:</label>
        <input
          type="text"
          placeholder="Digite a categoria do filme aqui"
          value={input.category}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({ ...input, category: e.target.value })}
        />

        <label>Estreia:</label>
        <input
          type="text"
          placeholder="Digite a data de estreia do filme aqui"
          value={input.premiere}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({ ...input, premiere: e.target.value })}
        />

        <label>Duração (minutos):</label>
        <input
          type="number"
          placeholder="Digite a duração do filme em minutos"
          value={input.duration}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({ ...input, duration: parseInt(e.target.value) })}
        />
        <button onClick={handleRegister}>
          {editMovie.enabled ? "Alterar" : "Adicionar"}
        </button>

      </div>

      <div className="card-container">

        {memoizedMovies.map((item, index) => (
          <section key={index} className="card">
            <h3>{item.title}</h3>
            <div className="poster" onClick={() => handleDetails(item)}>
              <img src={item.poster} alt={item.title} />
            </div>
            <div className="button-container">
              <button className="btn" onClick={() => handleDelete(item)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button className="btn" onClick={() => handleEdit(item)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="btn" onClick={() => handleDetails(item)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </section>
        ))}
      </div>

      {modalOpen && selectedMovie && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedMovie.title}</h2>
            <p>Sinopse: {selectedMovie.synopsis}</p>
            <p>Elenco: {selectedMovie.cast}</p>
            <p>Avaliação: {selectedMovie.rating}</p>
            <p>Categoria: {selectedMovie.category}</p>
            <p>Estreia: {selectedMovie.premiere}</p>
            <p>Duração: {selectedMovie.duration} minutos</p>
            <button onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      )}
      <button className="scroll-to-top" onClick={scrollToTop}>
        &#8593;
      </button>
    </div>
  );
}