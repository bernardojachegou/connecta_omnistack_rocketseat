import React from 'react';
import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import './styles.css';

function TeacherForm() {
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas!"
                description="O primeiro passo é preencher esse formulário de inscrição."
            />
            <main>
                <fieldset>
                    <legend>Seus dados</legend>
                    <Input name="name" label="Nome completo" />
                    <Input name="avatar" label="Avatar" />
                    <Input name="whatsapp" label="Whatsapp" />
                    <Textarea name="bio" label="Biografia" />
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>
                    <Select
                        name="subject"
                        label="Matéria"
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Educação Física', label: 'Educação Física' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Inglês', label: 'Inglês' },
                            { value: 'Espanhol', label: 'Espanhol' },
                            { value: 'Literatura', label: 'Literatura' },
                            { value: 'Ciências', label: 'Ciências' },
                            { value: 'Biología', label: 'Biología' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Química', label: 'Química' },
                            { value: 'História', label: 'História' },
                            { value: 'Geografía', label: 'Geografía' },
                        ]}
                    />
                    <Input name="cost" label="Custo da sua hora por aula" />
                </fieldset>

                <fieldset>
                    <legend>Horários disponíveis
                        <button type="button">
                            + Novo horário
                        </button>
                    </legend>
                    <div className="schedule-item">
                        <Select
                            name="week_day"
                            label="Dia da semana"
                            options={[
                                { value: '0', label: 'Segunda' },
                                { value: '1', label: 'Terça' },
                                { value: '2', label: 'Quarta' },
                                { value: '3', label: 'Quinta' },
                                { value: '4', label: 'Sexta' },
                                { value: '5', label: 'Sábado' },
                                { value: '6', label: 'Domingo' },

                            ]}
                        />
                        <Input name="from" label="Das" type="time" />
                        <Input name="to" label="às" type="time" />

                    </div>
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                    <button type="button">
                        Salvar cadastro
                    </button>
                </footer>
            </main>
        </div>
    );
}

export default TeacherForm;
