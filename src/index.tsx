import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';

import GameList from 'app/views/GameList';
import Tabletop from 'app/views/Tabletop';
import Invitation from 'app/views/Invitation';
import { CommunicationContext } from 'app/context/CommunicationContext';
import { EventBusContext } from 'app/context/EventBusContext';
import { EventEmmiterEventBus } from 'app/repository/shared/EventEmmiterEventBus';

const router = createBrowserRouter([
    {
        path: '/games',
        element: <GameList />
    },
    {
        path: '/game/:gameId',
        element: <Tabletop />
    },
    {
        path: '/invitation/:id',
        element: <Invitation />
    },
    {
        path: '/',
        element: <App />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <>
        <CommunicationContext.Provider value={{}}>
            <EventBusContext.Provider value={new EventEmmiterEventBus()}>
                <RouterProvider router={router} />
            </EventBusContext.Provider>
        </CommunicationContext.Provider>
    </>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
