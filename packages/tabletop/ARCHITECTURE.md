# Arquitectura

## Buenas prácticas

Básate en la skill `React Best Practices` para escribir código React de calidad, legible y mantenible.

Además, ten en cuenta los siguientes criterios:

### General

- Evitar el uso de carpetas y archivos tipo `helpers`, `utils` o `mappers`.

### Components

Estructura

```
components/[PrincipalComponent]/
├── hooks/                                      # Hooks personalizados (opcional)
│   └── use[PrincipalComponent]Logic.ts
├── shared/                                     # Componentes compartidos
│   └── [SharedComponentForFooAndBar]/
│       ├── index.tsx
│       └── [SharedComponentForFooAndBar].tsx
├── components/                                 # Subcomponentes relacionados a este componente
│   ├── [SubComponentFoo]/
│   │   ├── components/
│   │   │   └── [SubComponentFooSubcomponent]/
│   │   │       └── [...]
│   │   ├── index.tsx
│   │   └── [SubComponentFoo].tsx
│   └── [SubComponentBar]/
│       ├── components/
│       │   └── [SubComponentBarSubcomponent]/
│       │       └── [...]
│       ├── index.tsx
│       └── [SubComponentBar].tsx
├── pages/                                      # Subpáginas relacionadas a este componente, si aplica
│   ├── [Subpage]/
│       ├── components/
│       │   └── [SubpageFooSubcomponent]/
│       │       └── [...]
│       ├── index.tsx
│       └── [Subpage].tsx
├── [PrincipalComponent].tsx                    # Implementación principal
├── [PrincipalComponent].context.tsx            # Contexto específico del componente, opcional
├── PrincipalComponent.module.css               # Estilos específicos del componente, opcional
└── index.tsx                                   # Exportación pública
```

- Cada componente debe estar en su propio archivo `.tsx`, con nombre PascalCase, dentro de una carpeta con el mismo nombre (sin la extensión).
- Todos los componentes deben exportarse desde un archivo `index.tsx` contenido en la misma carpeta.
- Los componentes deben importar otros components a través de sus archivos `index.tsx` para mantener una estructura de importación limpia.
- Los componentes específicos de un componente principal deben estar organizados dentro de una subcarpeta `components/` dentro de la carpeta del componente principal.
- Si un componente es reutilizado entre dos o más componentes principales, debe colocarse en una carpeta `shared/` dentro de la carpeta del componente ancestro más cercano a ambos componentes principales.

### Pages

- Una `page` es un componente que es cargado mediante un `<Route>`. Debe seguir las mismas convenciones de estructura que los componentes,
- Se mantiene dentro de la carpeta `pages/` del componente principal al que pertenezca.

### useState

Evitar realizar múltiples llamadas consecutivas a la función `set...` de varios useState diferentes y relacionados entre si:

```tsx
const [data, setData] = useState([] as DataTypeItems[]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<ErrorType | null>(null);

useEffect(() => {
    setLoading(true);
    fetchData()
        .then((response) => {
            setData(response.data);
            setError(null);
        })
        .catch((err) => {
            setError(err);
            setData(initialData);
        })
        .finally(() => {
            setLoading(false);
        });
}, []);
```

En su lugar, es preferible usar un solo useState con un estado compuesto que agrupe los estados relacionados:

```tsx
const [state, setState] = useState<State>({
    data: [] as DataTypeItems[],
    loading: false as boolean,
    error: null as Error | null
});

useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    fetchData()
        .then((response) => {
            setState((prevState) => ({ ...prevState, data: response.data, error: null }));
        })
        .catch((err) => {
            setState((prevState) => ({ ...prevState, error: err, data: initialData }));
        })
        .finally(() => {
            setState((prevState) => ({ ...prevState, loading: false }));
        });
}, []);
```

Además:

- Evitar usar `useState` para almacenar datos que pueden ser derivados de otras fuentes, como props o el estado global contenido en IndexedDB, contextos o stores.
- Evitar usar `useState` para almacenar datos que no cambian durante el ciclo de vida del componente, como datos estáticos o constantes.

### Custom hooks

Aplica `Single Responsibility Principle`. Crea custom hooks para encapsular lógica compleja o reutilizable, especialmente en estos casos:

- si involucra estado o efectos secundarios.
- `useState` y `useEffect` directamente relacionados entre si
- `useCallback` y handler functions asociadas a eventos o interacciones.
- lógica de presentación que se repite en varios componentes.

Evitar crear custom hooks cuando:

- lógica simple o que no involucre estado o efectos secundario
- En los casos en los que el custom hook requiera más parámetros que las props del componente

### React context

Usa React Context para compartir datos o funciones entre componentes sin necesidad de prop drilling, especialmente cuando:

- Una prop se pasa a otro componente sin ser utilizada en el componente intermedio.
- el estado o función es necesario en múltiples niveles de la jerarquía de componentes.
- el estado o función es relevante para toda la aplicación o una sección significativa de ella.

## Testing

Cuando tengas que escribir, revisar, o refactorizar tests, carga la skill `testing` de este repositorio.
