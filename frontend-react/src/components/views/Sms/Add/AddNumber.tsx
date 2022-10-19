import React, {useContext, useState} from 'react';
import './AddNumber.css';
import {Done} from "../../../common/Done/Done";
import {getFetchData} from "../../../common/Fetch-api/Fetch-api";
import {ValidateError} from "../../../common/ValidateError/ValidateError";
import {LoadingContext} from "../../../../context/loading.context";

export const AddNumber = () => {
    const {loading, setLoading} = useContext(LoadingContext);
    const [done, setDone] = useState(false)
    const [form, setForm] = useState({
        name: '',
        surname: '',
        position: '',
        company: '',
        phone: '',
        group: '',
    });

    const addNumber = async (event: any) => {
        setDone(false)
        event.preventDefault();

            if(
                form.phone.length === 0
                ||
                form.phone.length < 9
                ||
                form.phone.length > 9
                ||
                form.name.length < 3
                ||
                form.surname.length < 3
                ||
                form.position.length < 3
                ||
                form.company.length < 3
            ) {
                return;
            } else {
                getFetchData({
                    url: '/sms/add-phone',
                    method: 'POST',
                    body: JSON.stringify(form)
                })
                    .then(resp => resp.json())
                    .then(resp => {
                            if (resp.id) {
                                setDone(true)
                            }
                        }
                    )
            }
    }

    if (done) {
        return <Done message={`Numer ${form.phone} dodany do bazy.`} text="Powrót" to={"/sms"}/>
    }

    const updateForm = (key: string, value: any) => {
        setLoading(true);
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };


    return (
        <div className="wrapper-add-phones">
            <h2>Dodaj numer do bazy!</h2>

            <form onSubmit={addNumber}>
                <div>
                        <input
                            name='name'
                            value={form.name}
                            className="input-number"
                            onChange={e => {
                                updateForm('name', e.target.value);
                                if(e.target.value.length < 3){
                                    e.currentTarget.classList.remove('input-number');
                                    e.currentTarget.classList.add('input--error')
                                } else {
                                    e.currentTarget.classList.remove('input--error');
                                    e.currentTarget.classList.add('input-number')
                                }
                            }}
                            placeholder="Imię"
                            required
                        />
                    <ValidateError length={form.name.length} lengthMin={0} lengthMax={3} text='Wpisz przynajmniej 3 znaki!'/>
                        <input
                            name='surname'
                            value={form.surname}
                            className="input-number"
                            onChange={e => updateForm('surname', e.target.value)}
                            placeholder="Nazwisko"
                            required
                        />
                    <ValidateError length={form.surname.length} lengthMin={0} lengthMax={3} text='Wpisz przynajmniej 3 znaki!'/>
                        <input
                            name='company'
                            value={form.company}
                            className="input-number"
                            onChange={e => updateForm('company', e.target.value)}
                            placeholder="Firma / lokalizacja"
                            required
                        />
                    <ValidateError length={form.company.length} lengthMin={0} lengthMax={3} text='Wpisz przynajmniej 3 znaki!'/>
                        <input
                            name='position'
                            value={form.position}
                            className="input-number"
                            onChange={e => updateForm('position', e.target.value)}
                            placeholder="Stanowisko"
                            required
                        />
                    <ValidateError length={form.position.length} lengthMin={0} lengthMax={3} text='Wpisz przynajmniej 3 znaki!'/>
                        <input
                            name='phone'
                            type='number'
                            className={(form.phone.length > 0 && form.phone.length < 9 || form.phone.length > 9) ? "input--error" : "input-number"}
                            value={form.phone}
                            minLength={0}
                            maxLength={9}
                            onChange={e => {
                                updateForm('phone', e.target.value);
                                if(e.target.value.length < 9){
                                    e.currentTarget.classList.add('input--error')
                                }
                            }}
                            placeholder="Numer Telefonu"
                        />
                    <ValidateError
                        length={form.phone.length}
                        lengthMin={0}
                        lengthMax={9}
                        text='Numer za krótki! Poprawny numer ma 9 cyfr (bez kierunkowego)'
                    />
                    <ValidateError
                        length={form.phone.length}
                        lengthMin={9}
                        lengthMax={255}
                        text='Numer za długi! Poprawny numer ma 9 cyfr (bez kierunkowego)'
                    />

                    </div>
                <button>Dodaj</button>
            </form>
        </div>
    );
}
