import React, {ChangeEvent, useContext, useEffect} from 'react';
import './AddNumberToSend.css'
import {PhonesContext} from "../../../../context/phones.context";
import {LoadingContext} from "../../../../context/loading.context";

export interface PhonesToSend {
    id: string,
    phone: string,
    company: string,
    name: string,
    surname: string,
}

export const AddNumberToSend = ({smsBase}: any) => {
    const {loading, setLoading} = useContext(LoadingContext);
    const {phones, setPhones} = useContext(PhonesContext);

    useEffect(() => {
        setLoading(true);
    }, []);

    const onHandleAddNumberToSend = (e: ChangeEvent<HTMLInputElement>, sms: string, id: string, company: string, name: string, surname: string) => {
        if (e.target.checked && e.target.parentElement) {
            if(phones[0].phone === ''){
                setPhones(() => [{
                    phone: sms,
                    id: id,
                    company,
                    name,
                    surname
                }])
            } else {
                setPhones(() => [...phones, {
                    phone: sms,
                    id: id,
                    company,
                    name,
                    surname
                }])
            }
        } else {
            const filter = phones.filter(phone => phone.id !== id)
            setPhones(filter);
            if (filter.length === 0) {
                setPhones([{
                    id: '',
                    phone: '',
                    company: '',
                    name: '',
                    surname: ''
                }]);
            }

        }
    };

    const check = (id: string) => {
        if(phones[0].phone === ''){
            return false
        } else {
            return phones.some(phone => phone.id === id)
        }
    }

    return (
        <>
            {smsBase
                .map((sms: any) => (
                    <div
                        className="addNumberToSend"
                        key={sms.id}
                    >
                        <label
                            className={check(sms.id) ? 'addNumberToSend--paragraf addNumberToSend--active' :  "addNumberToSend--paragraf"}
                            htmlFor={sms.id}
                        > {sms.company} - {sms.surname} - {sms.name} - {sms.position} - {sms.phone}
                        </label>
                        <input
                            type="checkbox"
                            className="addNumberToSend--checkbox"
                            name="add-number"
                            id={sms.id}
                            checked={check(sms.id)}
                            onChange={(e) => onHandleAddNumberToSend(e, sms.phone, sms.id, sms.company, sms.name, sms.surname)}
                        />
                    </div>
                ))}

        </>
    )
}