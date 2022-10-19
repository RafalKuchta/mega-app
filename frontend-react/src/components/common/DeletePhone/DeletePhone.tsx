import React, {useContext} from 'react';
import {PhonesContext} from "../../../context/phones.context";
import {GroupsContext} from "../../../context/groups.context";

interface Props {
	id: string,
	item: string,
}

export const DeletePhone = (props: Props) => {
	const {phones, setPhones} = useContext(PhonesContext);
	const {groups, setGroups} = useContext(GroupsContext);

	const filter = (props.item === 'phones')
		?
		phones.filter(phone => phone.id !== props.id)
		:
		groups.filter(group => group.id !== props.id);

	if (filter.length !== 0 && props.item === 'phones') {
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

	if (filter.length !== 0 && props.item === 'groups') {
		setGroups(filter);
	} else {
		setGroups([{
			id: '',
			group: '',
		}]);
	}
}