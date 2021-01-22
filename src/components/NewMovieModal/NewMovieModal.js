import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './NewMovieModal.css';

function NewMovieModal({close}) {

  axios.defaults.baseURL = 'https://mflix-example.herokuapp.com';

  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [plot, setPlot] = useState('');
  const [fullplot, setFullplot] = useState('');
  const [allFieldsRequired, setAllFieldsRequired] = useState(false);


  useEffect(() => {
    setAllFieldsRequired(false);
  },[title, poster, plot, fullplot]);

  function createMovie(e){
    e.preventDefault();
    if(!title || !poster || !plot || !fullplot){
      setAllFieldsRequired(true);
    } else {
      axios.post('/movies', {
        title,
        poster,
        plot,
        fullplot
      }).then((res) => {
        close();
        alert(`${res.data.title} adicionado com sucesso`);
      }).catch(err => {
        console.error(err);
      });
    }
  }
  

  return (
    <div className="newMovieModal">
      <button type="button" onClick={close} className="close">X</button>
      <h4>Novo Filme</h4>
      <form onSubmit={createMovie}>
        <label for="title">
          Título
          <input type="text" id="title" value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        </label>
        <label for="poster">
          URL do Poster
          <input type="text" id="poster" value={poster} onChange={e => setPoster(e.currentTarget.value)}/>
        </label>
        <label for="plot">
          Descrição
          <input type="text" id="plot" value={plot} onChange={e => setPlot(e.currentTarget.value)}/>
        </label>
        <label for="fullplot">
          Sinopse
          <textarea id="fullplot" value={fullplot} onChange={e => setFullplot(e.currentTarget.value)}/>
        </label>
        {allFieldsRequired && <span className="error">Preencha todos os campos</span>}
        <button type="submit" className="submit">Criar</button>
      </form>
    </div>
  );
}

export default NewMovieModal;