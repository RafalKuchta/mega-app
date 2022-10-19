import React, {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {getFetchData, getFetchDataId} from "../../../common/Fetch-api/Fetch-api";
import {Spinner} from "../../../common/Spinner/Spinner";
import {Btn} from "../../../common/Btn/Btn";

import './UserEdit.css';
import {LoadingContext} from "../../../../context/loading.context";
import {Toast} from "../../../common/Toast/Toast";

export const UserEdit = () => {
	const {loading, setLoading} = useContext(LoadingContext);
	const [form, setForm] = useState(
		{
			email: "",
			roles: "",
		});
	const [roles, setRoles] = useState([{
		id: '',
		roles: '',
	}])
	const {id} = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		(async () => {
			const res = await getFetchDataId({
				url: '/user/get-one/',
				method: 'GET',
				id,
			})
			const data = await res.json();
			setForm(
				{
					email: data.email,
					roles: data.roles,
				});

		})();

		//Pobieranie ról
		(async () => {
			const res = await getFetchData({
				url: '/user/roles/get-all',
				method: 'GET',
			})
			const data = await res.json();
			setRoles(data);
		})();
	}, []);

	const editUser = async (e: SyntheticEvent) => {
		setLoading(true);
		e.preventDefault();

		try {
			navigate('/users-list', {replace: true})
			await getFetchDataId({
				url: '/user/',
				method: 'PATCH',
				id,
				body: JSON.stringify({
					...form,
				}),
			})
		} finally {
			Toast(`Użytkownik ${form.email} ${form.roles} zapisany.`)
		}
	}

	const updateForm = (key: string, value: any) => {
		setForm(form => ({
			...form,
			[key]: value,
		}));
	};


	return (
		<>
			<div className="wrapper-edit-user">
				{(!roles[0]) ? <Spinner/> : null}
				<form className="edit-user" onSubmit={editUser}>
					<h2>Edytuj użytkownika</h2>
					<input
						type="text"
						name="name"
						required
						maxLength={1000}
						value={form.email}
						onChange={e => updateForm('name', e.target.value)}
					/>
					<select
						name="roles"
						required
						value={form.roles}
						onChange={e => updateForm('roles', e.target.value)}
					>
						{
							roles[0]
								?
								roles.map((role, i) => (
									<option
										key={i}
										value={role.roles}
									>{role.roles}</option>
								))
								:
								null
						}
					</select>
					<Btn text="Zapisz"/>
				</form>
			</div>
		</>
	)
}