import React, {useContext, useEffect, useState} from 'react';
import {LoadingContext} from "../../../context/loading.context";

import './Numbers-list.css';
import {getAxiosData} from "../../common/Axios-api/Axios.api";
import {useNavigate} from "react-router";
import {toast, ToastContainer} from "react-toastify";
import {Spinner} from "../../common/Spinner/Spinner";

interface NumbersEntity {
	id: string;
	name: string;
	surname: string;
	phone: string;
	position: string;
	groups?: {
		id: string,
		name: string,
	};
}

export const NumbersList = ({setIsLogined}: any) => {
	const {loading, setLoading} = useContext(LoadingContext);
	const [numbers, setNumbers] = useState<NumbersEntity[]>([]);

	useEffect(() => {
		setLoading(true);
		(async () => {
			const response = await getAxiosData({
				url: "/sms/get-all",
				method: "GET",
			});
			if(response[0].name){
				setNumbers(response);
			} else {
				setLoading(false);
			}
		})();
	}, []);

	const navigate = useNavigate();

	const onChangeEdit = (e: any, id: string) => {
		if (setIsLogined !== 'admin') {
			toast.error('Dostęp ma tylko admin!', {
				position: toast.POSITION.TOP_RIGHT,
				className: 'foo-bar'
			});
		} else {
			navigate(`/numbers-list/edit/${id}`);
		}
	}

	const addNumber = () => {
		navigate('/sms/add');
	}


	return (
		<>
			<h2 className='h2-list-numbers'>Lista numerów w bazie</h2>
			{(numbers.length === 0)
				?
				<Spinner/>
				:
				(<div className="list-numbers">
					<ToastContainer autoClose={5000}/>
					<div className="list-numbers-addNumber">
						<button onClick={addNumber}>Dodaj numer do bazy</button>
					</div>
					<table>
						<thead>
						<tr>
							<th>Nazwisko</th>
							<th>Imię</th>
							<th>Stanowisko</th>
							<th>Firma / Lokalizacja</th>
							<th>Numer</th>
							<th>Grupa</th>
						</tr>
						</thead>
						{numbers.length > 1
							?
							numbers
								.sort((a: any, b: any) => a.surname > b.surname ? 1 : -1)
								.map((number: any, i) => (
									<tbody key={i}>
									<tr
										onClick={() => onChangeEdit((e: any) => e.target.value, number.id)}
									>
										<td>{number.surname}</td>
										<td>{number.name}</td>
										<td>{number.position}</td>
										<td>{number.company}</td>
										<td>{number.phone}</td>
										<td>{number.groups ? number.groups.name : "Brak"}</td>
									</tr>
									</tbody>

								)) : null}
					</table>
				</div>)
			}
		</>
	)
}