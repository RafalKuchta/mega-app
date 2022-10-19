import React, {useContext, useEffect, useState} from 'react';

import './User.css';
import {useNavigate} from "react-router";
import {LoadingContext} from "../../../context/loading.context";
import {getAxiosData} from "../../common/Axios-api/Axios.api";
import {toast} from "react-toastify";
import {Spinner} from "../../common/Spinner/Spinner";
import {Btn} from "../../common/Btn/Btn";

interface UsersEntity {
	id: string;
	email: string;
	roles: string;
}

export const User = ({setIsLogined}: any) => {
	const {loading, setLoading} = useContext(LoadingContext);
	const [users, setUsers] = useState<UsersEntity[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		(async () => {
			setLoading(true);
			const response = await getAxiosData({
				url: "/user/get-all",
				method: "GET",
			});
			setUsers(response);
			setLoading(false);
		})();
	}, [loading]);


	const onChangeEdit = (e: any, id: string) => {
		if (setIsLogined !== 'admin') {
			toast.error('Dostęp ma tylko admin!', {
				position: toast.POSITION.TOP_RIGHT,
				className: 'foo-bar'
			});
		} else {
			navigate(`/users-list/edit/${id}`);
		}
	}

	return (
		<>
			{setIsLogined !== 'admin'
				?
				navigate('/sms')
				:
				<>
					<h2>Lista użytkowników</h2>
					{(users.length === 0) ? <Spinner/> : null}
					<div className="list-users">
						<table>
							<thead>
							<tr>
								<th>Email</th>
								<th>Rola</th>
							</tr>
							</thead>
							{
								users
									.sort((a: any, b: any) => a.email > b.email ? 1 : -1)
									.map((user, i) => (
										<tbody key={i}>
										<tr
											onClick={() => onChangeEdit((e: any) => e.target.value, user.id)}
										>
											<td>{user.email}</td>
											<td>{user.roles}</td>
										</tr>
										</tbody>
									))
							}
						</table>
					</div>
					<div className="user-edit">
						<Btn text='Powrót do strony głównej' to='/sms'/>
						<Btn text='Dodaj użytkownika' to='/register'/>
					</div>

				</>
			}
		</>
	)
}