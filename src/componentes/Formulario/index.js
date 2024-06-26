import './Formulario.css';
import Questionario from '../Questionario';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { useState } from 'react';



const Formulario = () => {

  const descricao_formulario = 'Agradecemos por dedicar seu tempo para realizar o preenchimento nosso questionário de pesquisa. Gostaríamos de tranquilizá-lo de que todos os dados fornecidos neste questionário são confidenciais e serão utilizados apenas para fins de análise e melhoria dos nossos serviços.';
  const [mostrarQuestionario, setMostrarQuestionario] = useState(false);

  const aoIniciar = (evento) => {
    evento.preventDefault();
    setMostrarQuestionario(true);
  };

  return (
    <section className='formulario'>
      {!mostrarQuestionario ? (
        <form className="text-center pt-2" onSubmit={aoIniciar}>
          <div className='formulario-btn-informacao'>
          <Tooltip title={descricao_formulario} position="left" trigger="mouseenter">
            <span className='btn btn-outline-danger border-0'>
              <i className="fa-solid fa-circle-question fa-xl"></i> Informação
            </span>
          </Tooltip>
          </div>
          <h1 className='formulario-titulo'>Pesquisa de satisfação do serviço da GETIC</h1>
          <h2 className='formulario-subtitulo pb-5 fs-5'>Por favor, avalie cada item a seguir, selecionando a opção que melhor descreve sua experiência.</h2>
          <Tooltip title="Clique para iniciar pesquisa" position="right" trigger="mouseenter">
            <button className='btn btn-success btn-lg' type="submit">
              <i className="fa-solid fa-play"></i> Iniciar 
            </button>
          </Tooltip>
        </form>
      ) : (
        <Questionario />
      )}
    </section>
  );
};

/** exportado a função */
export default Formulario;

