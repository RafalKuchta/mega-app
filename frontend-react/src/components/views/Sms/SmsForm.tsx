import React, {ChangeEvent, SyntheticEvent, useContext, useEffect, useState} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './SmsForm.css';
import {AddNumberToSend} from "./Add-number-to-send/AddNumberToSend";
import {PhonesContext} from "../../../context/phones.context";
import {Toast} from "../../common/Toast/Toast";
import {getAxiosData} from "../../common/Axios-api/Axios.api";
import {GroupsContext} from "../../../context/groups.context";
import {AddGroupToSend} from "./Add-group-to-send/AddGroupToSend";
import {getFetchData} from "../../common/Fetch-api/Fetch-api";
import {ToastError} from "../../common/Toast/Toast-error";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {LoadingContext} from "../../../context/loading.context";

export interface SmsInBase {
	id: string,
	phone: string,
	code: string,
	name: string,
	surname: string,
	position: string,
	company: string,
}

export interface GroupsInBase {
	id: string,
	name: string,
}

export const SmsForm = ({email}: any) => {
	const {loading, setLoading} = useContext(LoadingContext);
	const [select, setSelect] = useState(true);
	const [done, setDone] = useState(false)
	const [sms, setSms] = useState('');
	const [code, setCode] = useState('48');
	const [number, setNumber] = useState('');
	const {phones, setPhones} = useContext(PhonesContext);
	const {groups, setGroups} = useContext(GroupsContext);
	const [groupsBase, setGroupsBase] = useState<GroupsInBase[]>([{
		id: '',
		name: '',
	}]);
	const [smsBase, setSmsBase] = useState([{}]);

	const [isAddingNumber, setIsAddingNumber] = useState(false);
	const [isAddingGroup, setIsAddingGroup] = useState(false);

	useEffect(() => {
		setLoading(true);
		setSmsBase([]);
		setPhones([{
			id: '',
			phone: '',
			company: '',
			name: '',
			surname: '',
		}]);

		(async () => {
			try {
				const numbers = await getAxiosData({
					url: "/sms/get-all",
					method: "GET",
				});
				numbers.sort((a: any, b: any) => a.company > b.company ? 1 : -1)
				setSmsBase(numbers);

				const groups = await getAxiosData({
					url: "/sms/groups/get-all",
					method: "GET",
				});
				groups.sort((a: any, b: any) => a.name > b.name ? 1 : -1)
				setGroupsBase(groups);
				setLoading(false);
			} catch (e) {
				throw (e as Error).message;
			}
		})();
	}, [])

	const sendSms = async (e: SyntheticEvent) => {
		setLoading(true);
		e.preventDefault();

		if (select && !number && phones[0].phone === '') {
			return ToastError('Wybierz przynajmniej jeden numer!');
		}

		if (select && number && number.length < 9) {
			return ToastError('Za krótki numer telefonu!');
		}

		if (!select && !number && groups[0].group === '') {
			return ToastError('Wpisz numer lub wybierz grupę!');
		}

		if (sms === '') {
			return ToastError('Wpisz tekst wiadomości!');
		}

		let smsObj = {
			user: email.email,
			code: `+${code}`,
			mobile_number: number ?? null,
			message: sms,
			phones: phones[0].phone === '' ? null : phones,
		}

		let groupObj = {
			user: email.email,
			code: `+${code}`,
			mobile_number: number ?? null,
			message: sms,
			groups: groups[0].group === '' ? null : groups,
		}

		Toast('Wysyłanie wiadomości...');

		getFetchData({
			url: '/sms/sms-send/',
			method: 'POST',
			body: JSON.stringify(select ? smsObj : groupObj)
		})
			.then(resp => resp.json())
			.then(resp => {
					if (resp.message) {
						setDone(true);
						Toast('Wiadomości wysłana.');
						setNumber('');
						setSms('');
						setIsAddingNumber(false);
						setPhones([{
							id: '',
							phone: '',
							company: '',
							name: '',
							surname: '',
						}]);
						setIsAddingGroup(false);
						setGroups([{
							id: '',
							group: ''
						}]);
					}
				}
			)
	};


	const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'code') {
			setCode(e.target.value.toString());
		} else if (e.target.name === 'number') {
			setNumber(e.target.value);
		} else if (e.target.name === 'sms') {
			setSms(e.target.value);
		}
	}

	const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value === '1') {
			setSelect(true);
		}
		if (e.target.value === '2') {
			setSelect(false);
		}
	}

	const addNumberToSend = () => {
		setIsAddingNumber(current => !current);
		setPhones([{
			id: '',
			phone: '',
			company: '',
			name: '',
			surname: '',
		}]);
		setGroups([{
			id: '',
			group: '',
		}])
	}

	const addGroupToSend = () => {
		setIsAddingGroup(current => !current);
		setPhones([{
			id: '',
			phone: '',
			company: '',
			name: '',
			surname: '',
		}]);
		setGroups([{
			id: '',
			group: '',
		}])
	}


	const deletePhone = (id: string, item: string) => {
		const filter = (item === 'phones')
			?
			phones.filter(phone => phone.id !== id)
			:
			groups.filter(group => group.id !== id);

		if (filter.length !== 0 && item === 'phones') {
			setPhones(filter);
		} else {
			setPhones([{
				id: '',
				phone: '',
				company: '',
				name: '',
				surname: '',
			}]);
		}

		if (filter.length !== 0 && item === 'groups') {
			setGroups(filter);
		} else {
			setGroups([{
				id: '',
				group: '',
			}]);
		}
	}

	return (
		<div className={isAddingNumber || isAddingGroup ? "wrapper-sms--showAll" : "wrapper-sms"}>
			<ToastContainer autoClose={2000}/>
			<h2>Bramka SMS!</h2>
			<form onSubmit={(e) => sendSms(e)}>

				<select name='select' onChange={(e) => handleChangeSelect(e)}>
					<option value="1">Pojedyńczy sms</option>
					<option value="2">Do grupy</option>
				</select>

				<div className='codeAndNumber'>
					<div className="wrapper-icon-plus">
						<FontAwesomeIcon
							icon={faPlus}
							className={code === '48' ? "icon-plus" : "icon-plus-border-red"}
						/>
					</div>
					<input
						type="number"
						name='code'
						className={code === '48' ? "input-one-sm--code" : "input-code-border-red"}
						value={code}
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="number"
						name='number'
						className={(select && number && number.length < 9 || code !== '48' && select && number && number.length > 9) ? "input-one-sms--error" : "input-one-sms"}
						placeholder="Wpisz numer telefonu bez kierunkowego..."
						minLength={9}
						maxLength={14}
						value={number}
						onChange={(e) => handleChange(e)}
					/>
				</div>

				{(code !== '48' && select && number && number.length < 9)
					?
					<p className='error'>Numer za krótki! Poprawny numer zagraniczny ma do 12 cyfr (bez
						kierunkowego)</p>
					:
					null}

				{(code !== '48' && select && number && number.length > 13)
					?
					<p className='error'>Numer za długi! Poprawny numer zagraniczny ma do 12 cyfr (bez kierunkowego)</p>
					:
					null}

				{(code === '48' && select && number && number.length < 9)
					?
					<p className='error'>Numer za krótki! Poprawny numer w Polsce ma 9 cyfr (bez kierunkowego)</p>
					:
					null}
				{(code === '48' && select && number && number.length > 9)
					?
					<p className='error'>Numer za długi! Poprawny numer w Polsce ma 9 cyfr (bez kierunkowego)</p>
					:
					null}


				{select
					? <button type="button" className="button-add" onClick={addNumberToSend}>Dodaj inne numery z
						bazy</button>
					: <button type="button" className="button-add" onClick={addGroupToSend}>Wybierz grupę</button>}

				{isAddingNumber && select
					? <div
						className={"addNumberToSend-wrapper"}
					>
						<AddNumberToSend
							smsBase={smsBase}
						/>
					</div>

					: null}

				{isAddingGroup && !select
					? <div
						className={"addNumberToSend-wrapper"}
					>
						<AddGroupToSend
							groupsBase={groupsBase}
						/>
					</div>
					: null}

				<textarea
					name='sms'
					onChange={(e) => handleChange(e)}
					placeholder="Wiadomość... maksymalnie 160 znaków!"
					maxLength={160}
					value={sms}
				/>
				<button type="submit">Wyślij</button>
			</form>

			{phones[0].phone  && isAddingNumber
				?
				<div className="phonesToSend-wrapper">
					<div className="phonesToSend-count">
						<div className='phonesToSend-count--span'>{phones.length}</div>
					</div>
					{phones.map((p, i) => (
						<div key={i} className="phonesToSend">
							<div className="phonesToSend-details">
								{p.phone} - {p.surname} {p.name} - {p.company}
							</div>
							<div className="phonesToSend-trash">
								<FontAwesomeIcon
									icon={faTrashCan}
									className="icon-trash"
									onClick={() => deletePhone(p.id, "phones")}
								/>
							</div>
						</div>
					))}
				</div>
				:
				null}

			{groups[0].group && isAddingGroup
				?
				<div className="phonesToSend-wrapper">
					<div className="phonesToSend-count">
						<div className='phonesToSend-count--span'>{groups.length}</div>
					</div>
					{groups.map((g, i) => (
						<div key={i} className="phonesToSend">
							<div className="phonesToSend-details">
								{g.group}
							</div>
							<div className="phonesToSend-trash">
								<FontAwesomeIcon
									icon={faTrashCan}
									className="icon-trash"
									onClick={() => deletePhone(g.id, "groups")}
								/>
							</div>
						</div>
					))}
				</div>
				:
				null}
		</div>
	);
}
