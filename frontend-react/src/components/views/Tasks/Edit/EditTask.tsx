import {Spinner} from "../../../common/Spinner/Spinner";
import {Btn} from "../../../common/Btn/Btn";
import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import {LoadingContext} from "../../../../context/loading.context";

import './EditTask.css';
import {useNavigate, useParams} from "react-router";
import {getFetchDataId} from "../../../common/Fetch-api/Fetch-api";

export const EditTask = () => {
    const {loading, setLoading} = useContext(LoadingContext);
    const [form, setForm] = useState({name:""});

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await getFetchDataId({
                url: '/todo/',
                method: 'GET',
                id,
            })
            const data = await res.json();

            setForm({name: data.name});
        })();
    }, []);


    const editToDo = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            navigate('/todo', {replace: true})
            await getFetchDataId({
                url: '/todo/',
                method: 'PATCH',
                id,
                body: JSON.stringify({
                    ...form,
                }),
            })
        } finally {
            setLoading(false);
        }
    }


    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    return (
        <div className="wrapper-edit-task">
            {(loading) ? <Spinner /> : null}
            <form className="edit-task" onSubmit={editToDo}>
                <h2>Edytuj zadanie</h2>
                <input
                    type="text"
                    name="name"
                    required
                    maxLength={1000}
                    value={form.name}
                    onChange={e => updateForm('name', e.target.value)}
                />
                <Btn text="Zapisz"/>
            </form>
        </div>
    )
}