import "./App.css";
import { useReducer } from "react";
import AppReducer from "./reducers/AppReducer";

function App() {
    const [state, dispatch] = useReducer(AppReducer, {
        account: null,
        role: null,
        area: null,
    });
    return (
        <div className="App">
            <p>Hello world</p>
        </div>
    );
}

export default App;
