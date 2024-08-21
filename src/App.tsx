import { useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/games');
    }, [navigate]);

    return null;
}

export default App;
