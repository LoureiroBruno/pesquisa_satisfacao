import './Questionario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tippy';
import Swal from 'sweetalert2';
import 'react-tippy/dist/tippy.css';
import questionsData from './questions.json';
// import axios from 'axios';


function Questionario() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [respostas, setRespostas] = useState({});
    const [clicadoConcluir, setClicadoConcluir] = useState(false);
    const [podeAvancar, setPodeAvancar] = useState(false);
    const totalPerguntas = questionsData.length;

    useEffect(() => {
        if (currentQuestion === totalPerguntas  && clicadoConcluir) {
            showAlert();
        }
    }, [currentQuestion, totalPerguntas, clicadoConcluir]);

    const nextQuestion = () => {
        const nextQuestionNumber = currentQuestion + 1;
        setCurrentQuestion(nextQuestionNumber);

        const radioButtons = document.getElementsByName(questionsData[currentQuestion - 1].id);
    radioButtons.forEach(radioButton => {
        radioButton.checked = false;
    });
    
        setPodeAvancar(false); 
    };

    const handleOptionChange = (event) => {
        const questionId = currentQuestion;
        const answer = event.target.value;
        setRespostas(prevRespostas => ({
            ...prevRespostas,
            [questionId]: answer
        }));
        setPodeAvancar(true); 
    };

    const showAlert = () => {
        Swal.fire({
            title: 'Obrigado por sua participação!',
            text: 'Sua opinião é extremamente valiosa para nós.',
            icon: 'success',
            confirmButtonText: 'Voltar à página inicial'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload(); 
            }
        });
    };

    const renderQuestion = () => {
        const currentQuestionData = questionsData.find(question => question.id === currentQuestion);
        if (!currentQuestionData) return null;
    
        const contagemDeQuestoes = currentQuestionData.id + 'ª do total de ' + totalPerguntas + 'ª'

        return (
            <div id={`question${currentQuestion}`}>
                <Tooltip title={contagemDeQuestoes} position="right" trigger="mouseenter">
                    <button className='questionario-titulo btn btn-outline-danger'> 
                        {currentQuestionData.id} | {totalPerguntas}
                    </button>
                </Tooltip>
                <h1 className='mt-2'> {currentQuestionData.id} - {currentQuestionData.question}</h1>
                <div className='pb-5 fs-5'>
                    {currentQuestionData.options.map((option, index) => (
                        <div key={index} className="form-check form-check-inline">
                            <input 
                                className='form-check-input' 
                                type="radio" 
                                name={currentQuestionData.id} 
                                value={option} 
                                onChange={handleOptionChange} 
                                required
                            /> 
                            {option}
                            <label className="form-check-label"></label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Respostas:", respostas);

        if (currentQuestion === totalPerguntas && clicadoConcluir) {
            /** Salvar as respostas em um banco de dados */
            // axios.post('http://localhost:3001/respostas', respostas)
            // .then(response => {
            //     console.log(response.data.message);
            // })
            // .catch(error => {
            //     console.error('Erro ao salvar a resposta:', error);
            // });
        }
    };

    const handleConcluirClick = () => {
        setClicadoConcluir(true); // Atualizar o estado quando o botão "Concluir" for clicado
    };

    const renderButtonTextTitle = () => {
        return currentQuestion === totalPerguntas ? 'Clique para concluir' : 'Clique para proseguir';  
    };

    const renderButtonText = () => {
        return currentQuestion === totalPerguntas ? 'Concluir' : 'Próxima pergunta';
    };

    const iconeFontAwsome = () => {
        return currentQuestion === totalPerguntas ? "fa-solid fa-check" : "fa-solid fa-forward";
    };
    
    // `iconeFontAwsome` retorne uma string, não uma função
    const icone = iconeFontAwsome(); 

    return (
        <section className='questionario'>
            <form className="text-center pt-3" onSubmit={handleFormSubmit}>
                {renderQuestion()}
                {currentQuestion <= totalPerguntas && (
                    <Tooltip title={renderButtonTextTitle()} position="right" trigger="mouseenter">
                        <button type="submit" className='btn btn-success btn-lg' 
                            onClick={podeAvancar ? (currentQuestion === totalPerguntas ? handleConcluirClick : nextQuestion) : null} disabled={!podeAvancar}>
                           <i className={icone}></i> {renderButtonText()}
                        </button>
                    </Tooltip>
                )}
            </form>
        </section>
    );
}

export default Questionario;
