import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';

const navItems = [
    { label: 'Lobby', to: '/' },
    { label: 'Compendium', to: '/compendium' },
    { label: 'Sessions', to: '/sessions/live' },
    { label: 'Loadout', to: '/loadout/cards' }
];

function LocationPill() {
    const location = useLocation();

    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            {location.pathname}
        </div>
    );
}

function Shell({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
    return (
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</p>
                <h1 className="text-5xl leading-none text-white sm:text-6xl">{title}</h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">{body}</p>
                <div className="flex flex-wrap gap-3">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            className={({ isActive }) =>
                                [
                                    'rounded-full px-4 py-2 text-sm font-semibold transition',
                                    isActive
                                        ? 'bg-cyan-300 text-slate-950'
                                        : 'border border-white/10 bg-white/5 text-white hover:border-cyan-300 hover:text-cyan-200'
                                ].join(' ')
                            }
                            to={item.to}
                            end={item.to === '/'}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[var(--panel-bg)] p-6 shadow-2xl shadow-slate-950/40 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Shell único</p>
                <div className="mt-5 space-y-4 text-sm text-slate-200">
                    <p>
                        Todas las rutas bajo <code>/tabletop/*</code> aterrizan en este mismo HTML prerenderizado.
                    </p>
                    <p>
                        React Router toma el control después de la hidratación y decide qué vista enseñar sin crear
                        archivos Astro por subruta.
                    </p>
                    <LocationPill />
                </div>
            </div>
        </section>
    );
}

function LobbyPage() {
    return (
        <Shell
            eyebrow="Lobby"
            title="Una SPA capturada por un único shell Astro."
            body="Este punto de entrada vive en /tabletop. Si llegas por una deep link, Cloudflare reescribe la navegación al mismo documento y React Router resuelve la pantalla en cliente."
        />
    );
}

function CompendiumPage() {
    return (
        <Shell
            eyebrow="Compendium"
            title="Subrutas profundas sin archivos .astro adicionales."
            body="La ruta /tabletop/compendium existe solo en el router cliente. No hay catch-all SSR ni getStaticPaths; el fallback se hace en Workers mediante _redirects."
        />
    );
}

function SessionsPage() {
    return (
        <Shell
            eyebrow="Sessions"
            title="Deep links directas siguen cargando bien."
            body="Puedes entrar a /tabletop/sessions/live desde el navegador y terminarás aquí con el mismo HTML base, ya hidratado por React."
        />
    );
}

function LoadoutPage() {
    return (
        <Shell
            eyebrow="Loadout"
            title="CSR puro donde lo necesitas."
            body="La app bajo /tabletop opera como SPA real con BrowserRouter y basename fijo. El resto del proyecto puede seguir usando Astro estático o SSR puntual."
        />
    );
}

function NotFoundPage() {
    return (
        <Shell
            eyebrow="Fallback"
            title="La ruta llegó al shell, pero no existe en React Router."
            body="Eso confirma que el fallback de Cloudflare ha funcionado. Ahora la decisión final queda en el router cliente, que puede mostrar su 404 interna."
        />
    );
}

export default function App() {
    return (
        <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 py-16">
            <Routes>
                <Route path="/" element={<LobbyPage />} />
                <Route path="/compendium" element={<CompendiumPage />} />
                <Route path="/sessions/live" element={<SessionsPage />} />
                <Route path="/loadout/cards" element={<LoadoutPage />} />
                <Route path="/index.html" element={<Navigate replace to="/" />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}
