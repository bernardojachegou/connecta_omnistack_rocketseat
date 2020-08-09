import React, { useState, FormEvent } from 'react';

import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import WarningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

const TeacherForm: React.FC = () => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    const [scheduleItems, setScheduleItems] = useState([{
        week_day: 0,
        from: '',
        to: ''
    }]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {
                week_day: 0,
                from: '',
                to: ''
            }
        ])
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro.');
        })
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível, você será um grande voluntário!"
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome completo"
                            className="first"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Informações da aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Inglês', label: 'Inglês' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Química', label: 'Química' },
                            ]}
                            className="first"
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div
                                    key={scheduleItem.week_day}
                                    className={index ? 'schedule-item' : 'schedule-item first'}
                                >
                                    <Select
                                        className="first"
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={WarningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todo os dados
          </p>
                        <button type="submit">
                            Salvar cadastro
          </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;
