import React from 'react';

import PageHeader from '../../components/PageHeader';

import './styles.css';
import TeacherItem from '../../components/PageHeader/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';


function TeacherList() {
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers">
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
                    <Input type="time" name="time" label="Hora" />
                </form>
            </PageHeader>

            <main>
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
            </main>
        </div>
    );
}

export default TeacherList;
