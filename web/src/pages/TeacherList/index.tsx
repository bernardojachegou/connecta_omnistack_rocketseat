import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import './styles.css';
import TeacherItem, { Teacher } from '../../components/PageHeader/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';



function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        console.log(response.data);
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os professores disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
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
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => { setWeek_day(e.target.value) }}
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
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />;
                })}
            </main>
        </div>
    );
}

export default TeacherList;
