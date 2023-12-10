import { useEffect, useState, useCallback, useMemo, useRef, ChangeEvent } from "react";
import './App.css'

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


export default function App() {

  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);
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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editMovie, setEditMovie] = useState<EditMovie>({
    enabled: false,
    movieTitle: "",
  });

  const totalMovies = useMemo(() => {
    return movies.length;
  }, [movies]);

  useEffect(() => {
    const savedMovies = localStorage.getItem("movieRegister");

    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("movieRegister", JSON.stringify(movies));
  }, [movies]);

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

  const handleRegister = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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

  return (

    <div className="container">

      <form className="form">

        <h1>Lista de Filmes</h1>
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
          Adicionar
        </button>
      </form>
    </div>

  );
}