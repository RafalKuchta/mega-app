import React, {useContext, useEffect, useState} from 'react';

import './Sent.css';

import {ToastContainer} from "react-toastify";
import {LoadingContext} from "../../../../context/loading.context";
import {getFetchDataId} from "../../../common/Fetch-api/Fetch-api";

interface SmsEntity {
  id: string;
  name: string;
  surname: string;
  phone: string;
  position: string;
  group?: string;
  sms: string;
  created_at: string;
}

export const Sent = () => {
  const {loading, setLoading} = useContext(LoadingContext);
  const [smsSent, setSmsSent] = useState<SmsEntity[]>([]);

  let defaultDate = new Date()
  defaultDate.setDate(defaultDate.getDate())

  const [dataInput, setDataInput] = useState<Date>(defaultDate);

  const onSetDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataInput(new Date(event.target.value))
  }

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await getFetchDataId({
        url: '/sms/sms-sent/',
        method: 'GET',
        id: `${dataInput.toLocaleDateString('en-CA')}`,
      })
      const response = await res.json();
      setSmsSent(response);
    })();

  }, [dataInput]);

  return (
    <>
      <h2>Lista wysłanych SMS'ów</h2>
      <div className="list-sent-sms">
        <ToastContainer autoClose={5000}/>
        <label htmlFor="date" id="date">Wybierz datę: </label>
        <input
          className="input-date"
          type="date"
          value={dataInput.toLocaleDateString('en-CA')}
          onChange={onSetDate}
        />
        {smsSent.length ?
          <table className="sent-table">
          <thead>
            <tr>
              <th>Data wysłania</th>
              <th>Gozina</th>
              <th>Nazwisko</th>
              <th>Imię</th>
              <th>Firma / Lokalizacja</th>
              <th>Numer</th>
              <th>Grupa</th>
              <th>Wiadomość</th>
              <th>Użytkownik</th>
            </tr>
          </thead>
          {smsSent
            .sort((a: any, b: any) => a.created_at > b.created_at ? 1 : -1)
            .map((sms: any, i) => (
              <tbody key={i}>
                <tr
                >
                  <td>{sms.created_at ? sms.created_at.slice(0, 10) : "Brak"}</td>
                  <td>{sms.created_at ? sms.created_at.slice(11, 19) : "Brak"}</td>
                  <td>{sms.surname ? sms.surname : "Brak"}</td>
                  <td>{sms.name ? sms.name : "Brak"}</td>
                  <td>{sms.company ? sms.company : "Brak"}</td>
                  <td>{sms.phone ? sms.phone : "Brak"}</td>
                  <td>{sms.group ? sms.group : "Brak"}</td>
                  <td>{sms.sms ? sms.sms : "Brak"}</td>
                  <td>{sms.user ? sms.user : "Brak"}</td>
                </tr>
              </tbody>
            ))}
        </table>
          : <p>Brak wysłanych dziś sms'ów.</p>}
      </div>
    </>
  )
}