import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import './styles.css';
import api from '../../services/api';

function TeacherForm() {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');



    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '', }
    ]);

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        })
        setScheduleItems(updatedScheduleItems);
    }

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '', }
        ]);
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
        }).catch((err) => {
            alert('Erro ao tentar cadastrar usuário!');
            console.log(err)
        })

        console.log({ name, avatar, whatsapp, bio, subject, cost, scheduleItems })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas!"
                description="O primeiro passo é preencher esse formulário de inscrição."
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input name="name" label="Nome completo" value={name} onChange={(event) => { setName(event.target.value) }} />
                        <Input name="avatar" label="Avatar" value={avatar} onChange={(event) => { setAvatar(event.target.value) }} />
                        <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(event) => { setWhatapp(event.target.value) }} />
                        <Textarea name="bio" label="Biografia" value={bio} onChange={(event) => { setBio(event.target.value) }} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(event) => { setSubject(event.target.value) }}
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
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(event) => { setCost(event.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                        </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={event => setScheduleItemValue(index, 'week_day', event.target.value)}
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
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={event => setScheduleItemValue(index, 'from', event.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="às"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={event => setScheduleItemValue(index, 'to', event.target.value)}
                                    />

                                </div>
                            );
                        })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar cadastro
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;
