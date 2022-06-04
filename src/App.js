import './App.css';
import Header from './components/header/Header';
import AppContext from './components/AppContext/AppContext';
import Login from './features/Auth/login/Login'
import AppReducer from './reducers/AppReducer';
import { useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    const [state, dispatch] = useReducer(AppReducer, {
        account: null,
        role: null,
        area: null,
    });
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
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="*" element={<div>Page not found</div>} />
                    </Routes>
                </div>
            </AppContext.Provider>
        </Router>
    );
}

export default App;
