import React, {useEffect, useState} from 'react';

import {Header} from './components/views/layout/Header';
import {Tasks} from './components/views/Tasks/Tasks';
import {SearchContext} from './context/search.context';
import {LoadingContext} from './context/loading.context';
import {Routes, Route} from 'react-router-dom';
import {EditTask} from "./components/views/Tasks/Edit/EditTask";
import {Login} from './components/views/Login/Login';
import {Register} from "./components/views/Register/Register";
import {ErrorPage} from "./components/views/Error/ErrorPage";
import {MessageComponent} from "./components/views/Messages/MessageComponent";
import {Home} from "./components/views/Home/Home";
import {SmsForm} from "./components/views/Sms/SmsForm";
import {AddNumber} from "./components/views/Sms/Add/AddNumber";
import {UserContext} from "./context/message.context";
import {PhonesContext} from './context/phones.context';
import {NumbersList} from './components/views/Numbers/Numbers-list';
import {getAxiosData} from './components/common/Axios-api/Axios.api';
import {Edit} from "./components/views/Numbers/Edit/Edit";
import {GroupsContext} from './context/groups.context';
import {Sent} from "./components/views/Sms/Sent/Sent";
import {User} from "./components/views/Users/User";
import { UserEdit } from './components/views/Users/Edit/UserEdit';

export const App = () => {
    const [search, setSearch] = useState('');
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [phones, setPhones] = useState([{
        id: '',
        phone: '',
        company: '',
        name: '',
        surname: '',
    }]);
    const [groups, setGroups] = useState([{
        id: '',
        group: '',
    }]);
    const [{isLogined, email, roles}, setIsLogined] = useState({
        isLogined: false,
        email: '',
        roles: '',
    });

    useEffect(() => {
        (async () => {
            const response = await getAxiosData({
                url: "/auth/check",
                method: "GET",
            });

            if (!response.ok) {
                setIsLogined({
                    isLogined: false,
                    email: '',
                    roles: '',
                });
            } else {
                setIsLogined({
                    isLogined: response.ok,
                    email: response.email,
                    roles: response.roles,
                });
                setUser(email)
            }
			setLoading(false)
        })();
    }, [loading, search, email])

    return (
        <>
            <SearchContext.Provider value={{search, setSearch}}>
                <LoadingContext.Provider value={{loading, setLoading}}>
                    <UserContext.Provider value={{user, setUser}}>
                        <PhonesContext.Provider value={{phones, setPhones}}>
                            <GroupsContext.Provider value={{groups, setGroups}}>
                                <Routes>
                                    <Route path="/*" element={<ErrorPage/>}/>
                                    <Route path="/register" element={<Register/>}/>
                                    <Route
                                        path='/'
                                        element={
                                            isLogined ? (
                                                <>
                                                    <Header setIsLogined={{setIsLogined, email, roles}}/>
                                                    <Home />
                                                </>
                                            ) : (
                                                <Login setIsLogined={setIsLogined}/>
                                            )
                                        }
                                    />

                                    <Route
                                        path='/sms'
                                        element={
                                            isLogined ? (
                                                <>
                                                    <Header setIsLogined={{setIsLogined, email, roles}}/>
                                                    <SmsForm email={{email}}/>
                                                </>
                                            ) : (
                                                <Login setIsLogined={setIsLogined}/>
                                            )
                                        }
                                    />

                                    <Route
                                        path='/sms/add-number-to-send'
                                        element={
                                            isLogined ? (
                                                <>
                                                    <Header setIsLogined={{setIsLogined, email, roles}}/>

                                                </>
                                            ) : (
                                                <Login setIsLogined={setIsLogined}/>
                                            )
                                        }
                                    />

                                    <Route
                                        path='/sms/add'
                                        element={
                                            isLogined ? (
                                                <>
                                                    <Header setIsLogined={{setIsLogined, email, roles}}/>
                                                    <AddNumber/>
                                                </>
                                            ) : (
                                                <Login setIsLogined={setIsLogined}/>
                                            )
                                        }
                                    />

                                    <Route
                                        path='/sent'
                                        element={
                                            isLogined ? (
                                                <>
                                                    <Header setIsLogined={{setIsLogined, email, roles}}/>
                                                    <Sent/>
                                                </>
                                            ) : (
                                                <Login setIsLogined={setIsLogined}/>
                                            )
                                        }
                                    />

                                    <Route
                                        path='/numbers-list'
                                        element={
                                            isLogined ? (
                                                <>
                                                    <Header setIsLogined={{setIsLogined, email, roles}}/>
                                                    <NumbersList setIsLogined={roles}/>
                                                </>
                                            ) : (
                                                <Login setIsLogined={setIsLogined}/>
                                            )
                                        }
                                    />

                                    <Route
                                        path='/numbers-list/edit/:id'
                                        element={
                                            isLogined ? (
                                                <>
                                                    <Header setIsLogined={{setIsLogined, email, roles}}/>
                                                    <Edit/>
                                                </>
                                            ) : (
                                                <Login setIsLogined={setIsLogined}/>
                                            )
                                        }
                                    />

                                    <Route
                                        path='/users-list'
                                        element={
                                            isLogined ? (
                                                <>
                                                    <Header setIsLogined={{setIsLogined, email, roles}}/>
                                                    <User setIsLogined={roles}/>
                                                </>
                                            ) : (
                                                <Login setIsLogined={setIsLogined}/>
                                            )
                                        }
                                    />

                                    <Route
                                        path='/users-list/edit/:id'
                                        element={
                                            isLogined ? (
                                                <>
                                                    <Header setIsLogined={{setIsLogined, email, roles}}/>
                                                    <UserEdit/>
                                                </>
                                            ) : (
                                                <Login setIsLogined={setIsLogined}/>
                                            )
                                        }
                                    />

                                    <Route
                                        path='/chat'
                                        element={
                                            isLogined ? (
                                                <>
                                                    <Header setIsLogined={{setIsLogined, email, roles}}/>
                                                    <MessageComponent email={email}/>
                                                </>
                                            ) : (
                                                <Login setIsLogined={setIsLogined}/>
                                            )
                                        }
                                    />

                                    {(roles === 'admin') ? (<Route
                                        path='/todo'
                                        element={
                                            isLogined ? (
                                                <>
                                                    <Header setIsLogined={{setIsLogined, email, roles}}/>
                                                    <Tasks setIsLogined={setIsLogined}/>
                                                </>
                                            ) : (
                                                <Login setIsLogined={setIsLogined}/>
                                            )
                                        }
                                    />) : null}
                                    <Route
                                        path='/edit/:id'
                                        element={
                                            isLogined ? (
                                                <>
                                                    <Header setIsLogined={{setIsLogined, email, roles}}/>
                                                    <EditTask />
                                                </>
                                            ) : (
                                                <Login setIsLogined={setIsLogined}/>
                                            )
                                        }
                                    />
                                </Routes>
                            </GroupsContext.Provider>
                        </PhonesContext.Provider>
                    </UserContext.Provider>
                </LoadingContext.Provider>
            </SearchContext.Provider>
        </>
    );
}
