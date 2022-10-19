import React, {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {LoadingContext} from "../../../../context/loading.context";
import {Spinner} from "../../../common/Spinner/Spinner";
import {Btn} from "../../../common/Btn/Btn";

import './Edit.css';
import {ToastContainer} from "react-toastify";
import {Toast} from "../../../common/Toast/Toast";
import {getFetchDataId} from "../../../common/Fetch-api/Fetch-api";
import {GetAllGroups} from "../../../common/GetAllGroups/GetAllGroups";

export const Edit = () => {
    const {loading, setLoading} = useContext(LoadingContext);
    const [isEdited, setIsEdited] = useState(false);
    const [groups, setGroups] = useState([{
        id: '',
        name: '',
    }])
    const [form, setForm] = useState({
        id: "",
        name: "",
        surname: "",
        phone: "",
        company: "",
        position: "",
        groups: {
            id: "",
            name: "",
        },
    });
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            const res = await getFetchDataId({
                url: '/sms/',
                method: 'GET',
                id: id,
            })
            const data = await res.json();
            setForm(data);
        })();

        (async () => {
            const resp = await GetAllGroups();
            setGroups(resp);
        })();
        setIsEdited(false);
    }, []);


    const navigate = useNavigate();

    const editNumberData = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdited) {
                await getFetchDataId({
                    url: '/sms/',
                    method: 'PATCH',
                    id: id,
                    body: JSON.stringify({
                        ...form,
                    }),
                })
            }
        } finally {
            setLoading(false);
            isEdited ? Toast(`Użytkownik ${form.name} ${form.surname} zapisany.`) : Toast('Nie wprowadzono zmian!');

            setTimeout(() => {
                navigate('/numbers-list', {replace: true})
            }, 3000);
        }
    }


    const updateForm = (key: string, value: any | React.FormEvent<HTMLOptionElement>) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
        setIsEdited(true);
    };

    const removeFromGroup = () => {
        setIsEdited(true);
        updateForm('groups', null)
    }

    return (
        <div className="wrapper-edit-number">
            {(loading) ? <Spinner/> : null}
            <ToastContainer autoClose={2000}/>
            <form className="wrapper-edit-number--edit-number" onSubmit={editNumberData}>
                <h2>Edytuj numer telefonu</h2>

                <label htmlFor="name">Imię:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={e => updateForm('name', e.target.value)}
                />

                <label htmlFor="surname">Surname:</label>
                <input
                    type="text"
                    name="surname"
                    value={form.surname}
                    onChange={e => updateForm('surname', e.target.value)}
                />

                <label htmlFor="phone">Numer:</label>
                <input
                    type="number"
                    name="phone"
                    value={form.phone}
                    onChange={e => updateForm('phone', e.target.value)}
                />

                <label htmlFor="company">Lokalizacja:</label>
                <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={e => updateForm('company', e.target.value)}
                />

                <label htmlFor="position">Stanowisko:</label>
                <input
                    type="text"
                    name="position"
                    value={form.position}
                    onChange={e => updateForm('position', e.target.value)}
                />

                <label htmlFor="group">Grupa:</label>
                <div className="wrapper-edit-number--group">
                    <select
                        id="group"
                        name="group"
                        onChange={(e) => updateForm('group', e.target.value)}
                    >
                        <option value={form.groups ? form.groups.name : "Brak"}
                                hidden>{form.groups ? form.groups.name : "Brak"}</option>

                        {
                            groups.map((group, i) => (
                                <>
                                    <option
                                        key={i}
                                        value={group.name}
                                    >{group.name}</option>
                                </>
                            ))
                        }
                    </select>
                    <div className="delete-from-group">
                        <button
                            type="reset"
                            onClick={removeFromGroup}
                        >Usuń z grupy
                        </button>
                    </div>
                </div>
                <Btn text="Zapisz"/>
            </form>
        </div>
    )
}