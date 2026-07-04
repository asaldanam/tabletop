import React, { createContext, memo, useMemo, useState } from 'react';

import { useTurnActions } from './hooks/useTurnActions';
import { useCharacterActions } from './hooks/useCharacterActions';
import { useCharacterMovement } from './hooks/useCharacterMovement';
import type {
    Character,
    CharacterMovementView,
    GameActionConfirmationView,
    GameActionRangeCell,
    GameActionState,
    GameActionTargetingView,
    Map,
    Position,
    Round
} from './types';

export type State = {
    action: GameActionState;
    characters: Character[];
    map: Map;
    rounds: Round[];
};

export type Actions = {
    cancelSelectedAction: () => void;
    confirmSelectedAction: () => void;
    endCurrentTurn: () => void;
    getActionConfirmation: () => GameActionConfirmationView | null;
    getActionRangeCells: () => GameActionRangeCell[];
    getActionTargeting: (characterId: string) => GameActionTargetingView;
    getCharacterMovement: (characterId: string) => CharacterMovementView;
    moveSelectedCharacterTo: (position: Position) => void;
    selectActionTarget: (characterId: string) => void;
    selectCurrentTurnCharacterAction: (actionId: string) => void;
    toggleCurrentTurnCharacterActions: () => void;
    toggleCurrentTurnCharacterMovement: () => void;
};

const ACTION_ICON_BASE = '/icons/ffffff/transparent/1x1';

const createAttackAction = (params: {
    damage: number;
    description: string;
    icon: string;
    id: string;
    name: string;
    range: number;
}): Character['actions']['list'][number] => ({
    description: params.description,
    effect: {
        type: 'damage',
        value: params.damage
    },
    icon: {
        url: `${ACTION_ICON_BASE}/${params.icon}`
    },
    id: params.id,
    name: params.name,
    target: {
        range: params.range,
        type: 'character'
    }
});

const createCharacter = (params: {
    action: Character['actions']['list'][number];
    id: string;
    name: string;
    position: Position;
    sprite: string;
}): Character => ({
    actions: {
        list: [params.action]
    },
    id: params.id,
    movement: {
        direction: undefined,
        isActive: params.id === '1',
        isMoving: false
    },
    name: params.name,
    position: params.position,
    sprite: params.sprite,
    wounds: {
        current: 0
    }
});

const INITIAL_STATE: State = {
    action: {
        isPanelOpen: false,
        selected: null
    },
    map: {
        cols: 22,
        image: {
            url: 'sauna-1-[22x22].jpg'
        },
        rows: 22
    },
    characters: [
        createCharacter({
            action: createAttackAction({
                damage: 1,
                description: 'Corte cuerpo a cuerpo contra un personaje adyacente.',
                icon: 'lorc/saber-slash.svg',
                id: 'sword-slash',
                name: 'Ataque de espada',
                range: 1
            }),
            id: '1',
            name: 'Arthur',
            position: { x: 1, y: 1 },
            sprite: 'arthur.webp'
        }),
        createCharacter({
            action: createAttackAction({
                damage: 2,
                description: 'Golpe pesado de corto alcance.',
                icon: 'delapouite/3d-hammer.svg',
                id: 'hammer-blow',
                name: 'Martillazo',
                range: 1
            }),
            id: '2',
            name: 'Pangu',
            position: { x: 2, y: 1 },
            sprite: 'pangu.webp'
        }),
        createCharacter({
            action: createAttackAction({
                damage: 2,
                description: 'Ráfaga ígnea contra un objetivo cercano.',
                icon: 'lorc/fire-breath.svg',
                id: 'fire-breath',
                name: 'Aliento ígneo',
                range: 3
            }),
            id: '3',
            name: 'Agumon',
            position: { x: 1, y: 2 },
            sprite: 'agumon.webp'
        }),
        createCharacter({
            action: createAttackAction({
                damage: 1,
                description: 'Proyectil eléctrico de alcance medio.',
                icon: 'lorc/charged-arrow.svg',
                id: 'charged-shot',
                name: 'Disparo cargado',
                range: 4
            }),
            id: '4',
            name: 'Tentomon',
            position: { x: 2, y: 2 },
            sprite: 'tentomon.webp'
        }),
        createCharacter({
            action: createAttackAction({
                damage: 2,
                description: 'Ataque preciso contra un enemigo adyacente.',
                icon: 'lorc/piercing-sword.svg',
                id: 'thrust',
                name: 'Estocada',
                range: 1
            }),
            id: '5',
            name: 'Alexander',
            position: { x: 3, y: 1 },
            sprite: 'alexander.webp'
        }),
        createCharacter({
            action: createAttackAction({
                damage: 3,
                description: 'Conjuro de fuego contra un objetivo a distancia.',
                icon: 'lorc/small-fire.svg',
                id: 'minor-flame',
                name: 'Llama menor',
                range: 4
            }),
            id: '6',
            name: 'Black Mage',
            position: { x: 4, y: 1 },
            sprite: 'black-mage.webp'
        }),
        createCharacter({
            action: createAttackAction({
                damage: 2,
                description: 'Impacto concentrado cuerpo a cuerpo.',
                icon: 'lorc/punch-blast.svg',
                id: 'ki-strike',
                name: 'Golpe ki',
                range: 1
            }),
            id: '7',
            name: 'Goku',
            position: { x: 3, y: 2 },
            sprite: 'goku.webp'
        }),
        createCharacter({
            action: createAttackAction({
                damage: 1,
                description: 'Ataque improvisado con alcance corto.',
                icon: 'lorc/firework-rocket.svg',
                id: 'mischief-rocket',
                name: 'Cohete travieso',
                range: 3
            }),
            id: '8',
            name: 'Sinchan',
            position: { x: 4, y: 2 },
            sprite: 'sinchan.webp'
        })
    ],
    rounds: [
        {
            currentTurnIndex: 0,
            turns: [
                { character: { id: '1' } },
                { character: { id: '2' } },
                { character: { id: '3' } },
                { character: { id: '4' } },
                { character: { id: '5' } },
                { character: { id: '6' } },
                { character: { id: '7' } },
                { character: { id: '8' } }
            ]
        }
    ]
};

const Context = createContext<{ actions: Actions; state: State } | null>(null);

export const GameState = {
    Provider: memo((props: { children: React.ReactNode }) => {
        const [state, setState] = useState<State>(INITIAL_STATE);

        const { getCharacterMovement, moveSelectedCharacterTo, toggleCurrentTurnCharacterMovement } =
            useCharacterMovement({
                state,
                setState
            });

        const {
            cancelSelectedAction,
            confirmSelectedAction,
            getActionConfirmation,
            getActionRangeCells,
            getActionTargeting,
            selectActionTarget,
            selectCurrentTurnCharacterAction,
            toggleCurrentTurnCharacterActions
        } = useCharacterActions({
            state,
            setState
        });

        const { endCurrentTurn } = useTurnActions({ setState });

        return (
            <Context.Provider
                value={{
                    state,
                    actions: useMemo(
                        (): Actions => ({
                            cancelSelectedAction,
                            confirmSelectedAction,
                            endCurrentTurn,
                            getActionConfirmation,
                            getActionRangeCells,
                            getActionTargeting,
                            getCharacterMovement,
                            moveSelectedCharacterTo,
                            selectActionTarget,
                            selectCurrentTurnCharacterAction,
                            toggleCurrentTurnCharacterActions,
                            toggleCurrentTurnCharacterMovement
                        }),
                        [
                            cancelSelectedAction,
                            confirmSelectedAction,
                            endCurrentTurn,
                            getActionConfirmation,
                            getActionRangeCells,
                            getActionTargeting,
                            getCharacterMovement,
                            moveSelectedCharacterTo,
                            selectActionTarget,
                            selectCurrentTurnCharacterAction,
                            toggleCurrentTurnCharacterActions,
                            toggleCurrentTurnCharacterMovement
                        ]
                    )
                }}
            >
                {props.children}
            </Context.Provider>
        );
    }),
    useContext: () => {
        const context = React.useContext(Context);
        if (!context) throw new Error('GameState context is not available');
        return context;
    }
};
