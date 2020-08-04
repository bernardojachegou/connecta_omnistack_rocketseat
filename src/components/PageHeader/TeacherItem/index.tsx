import React from 'react';

import whatsappIcon from '../../../assets/images/icons/whatsapp.svg'
import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/47263354?s=460&u=e02a441acc959b16334d30ab8e9d96f1adcb6b76&v=4" alt="Michel Bernardo" />
                <div>
                    <strong>Michel Bernardo</strong>
                    <span>Inglês</span>
                </div>
            </header>

            <p>
                Professor de Inglês com experência em ensino de língua inglesa para fins específicos.
            <br /><br />
            Especialista em ambientes digitais e amante de tecnologias.
        </p>

            <footer>
                <p>Preço/hora
            <strong>R$ 50,00 </strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                Entrar em contato
            </button>
            </footer>
        </article>
    );
}

export default TeacherItem;