import { Navigate, Route, Routes } from 'react-router-dom';
import { Tabletop } from './components/Tabletop';

export default function App() {
    return (
        <Routes>
            <Route path="/" Component={Tabletop} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
