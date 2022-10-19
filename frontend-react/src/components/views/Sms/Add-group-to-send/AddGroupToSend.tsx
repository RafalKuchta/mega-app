import React, {ChangeEvent, useContext} from 'react';
import './AddGroupToSend.css'
import {GroupsContext} from "../../../../context/groups.context";
import {LoadingContext} from "../../../../context/loading.context";

export interface GroupToSend {
    id: string,
    group: string,
}

export const AddGroupToSend = ({groupsBase}: any) => {
    const {loading, setLoading} = useContext(LoadingContext);
    const {groups, setGroups} = useContext(GroupsContext);

    const onHandleAddGroupToSend = (e: ChangeEvent<HTMLInputElement>, group: string, id: string) => {
        setLoading(true);
        if (e.target.checked) {
            if (groups[0].group === '' ){
                setGroups(() => [{group: group, id: id}]);
            } else {
                setGroups(() => [...groups, {group: group, id: id}]);
            }
        } else {
            const filter = groups.filter(group => group.id !== id)
            setGroups(filter);
            if(filter.length === 0){
                setGroups([{
                    id: '',
                    group: ''
                }]);
            }
        }
    }

    const check = (id: string) => {
        if(groups[0].group === ''){
            return false
        } else {
            return groups.some((item:any) => item.id === id)
        }
    }

    return (
        <>
            {groupsBase
                .map((group: any) => (
                    <div
                        className="addGroupToSend"
                        key={group.id}
                    >
                        <label
                            className={check(group.id) ? 'addGroupToSend--paragraf addGroupToSend--active' :  "addGroupToSend--paragraf"}
                            htmlFor={group.id}
                        > {group.name}
                        </label>
                        <input
                            type="checkbox"
                            className="addGroupToSend--checkbox"
                            name="add-group"
                            id={group.id}
                            checked={check(group.id)}
                            onChange={(e) => onHandleAddGroupToSend(e, group.name, group.id)}
                        />
                    </div>
                ))}

        </>
    )
}