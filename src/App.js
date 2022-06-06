import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import AppContext from './components/AppContext/AppContext';
import Account from './features/Accounts/Account';
import AccountList from './features/Accounts/AccountList/AccountList';
import FacilityForm from './features/Facilities/FacilityForm/FacilityForm';
import FacilityList from './features/Facilities/FacilityList/FacilityList';
import Login from './features/Auth/login/Login';
import AppReducer from './reducers/AppReducer';
import { useReducer, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from './api/axios';

function App() {
    const [state, dispatch] = useReducer(AppReducer, {
        account: null,
        role: null,
        area: null,
    });

    // Lấy thông tin user hiện tại
    const checkCurrentUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const option = {
                method: 'get',
                url: '/auth/',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios(option);
            if (res.data.data.document) {
                const document = res.data.data.document;
                dispatch({ type: 'CURRENT_USER', payload: document });
            }
        } catch (error) {
            
        }
    }, [dispatch]);

    useEffect(() => {
        checkCurrentUser();
    }, [checkCurrentUser]);

    return (
        <Router>
            <AppContext.Provider value={{ state, dispatch }}>
                <div>
                    <Header />
                    <Routes>
                        {/* <Route element={<ProtectedRoute user={state.user} />}>
                            <Route path="/students" element={<List />} />
                            <Route path="/form" element={<Form />} />
                            <Route
                                path="/students/:studentId"
                                element={<Form />}
                            />
                        </Route> */}
                        <Route path="/auth/login" element={
                            <div className='middle'>
                                <p className='intro'>
                                    <h1>Trang đăng nhập dành cho nhà quản lý</h1>
                                    Hãy đăng nhập để có thể truy cập thông tin bạn cần
                                </p> 
                                <Login /> 
                            </div>
                        } />

                        <Route path="/" element={<Home />}></Route>
                        <Route path="/users/:userId" element={<Account />} />
                        <Route path="/users" element={<AccountList />} />
                        
                        <Route path="/facilities" element={<FacilityForm />} />
                        {/* <Route path="/facilities" element={<FacilityList />} /> */}

                        <Route path="*" element={<div>Page not found</div>} />
                    </Routes>
                </div>
            </AppContext.Provider>
        </Router>
    );
}

export default App;
