import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { GameState, type Character } from '../../../../../Game.state';

type Position = Character['position'];

type CharacterMovement = {
    direction: 'left' | 'right';
    isMoving: boolean;
    isSelected: boolean;
};

type CharacterMovementById = Record<string, CharacterMovement>;

type UseTabletopCharacterMovementParams = {
    characters: Character[];
};

const STEP_DELAY_MS = 220;

const createStraightPath = (from: Position, to: Position) => {
    const path: Position[] = [];
    let x = from.x;
    let y = from.y;

    while (x !== to.x || y !== to.y) {
        x += Math.sign(to.x - x);
        y += Math.sign(to.y - y);
        path.push({ x, y });
    }

    return path;
};

const getMovementDirection = (from: Position, to: Position): CharacterMovement['direction'] => {
    const stepX = Math.sign(to.x - from.x);
    const stepY = Math.sign(to.y - from.y);

    return stepX - stepY >= 0 ? 'right' : 'left';
};

export const useTabletopCharacterMovement = (params: UseTabletopCharacterMovementParams) => {
    const { characters } = params;
    const [, setGameState] = GameState.useContext();
    const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
    const [movementByCharacterId, setMovementByCharacterId] = useState<CharacterMovementById>({});
    const movementTimeouts = useRef<Record<string, number>>({});

    const charactersById = useMemo(() => {
        return new Map(characters.map((character) => [character.id, character]));
    }, [characters]);

    const clearMovementTimeout = useCallback((characterId: string) => {
        const timeout = movementTimeouts.current[characterId];
        if (!timeout) return;

        window.clearTimeout(timeout);
        delete movementTimeouts.current[characterId];
    }, []);

    const updateCharacterPosition = useCallback(
        (characterId: string, position: Position) => {
            setGameState((currentState) => ({
                ...currentState,
                characters: currentState.characters.map((character) =>
                    character.id === characterId ? { ...character, position } : character
                )
            }));
        },
        [setGameState]
    );

    const setMovement = useCallback((characterId: string, movement: Partial<CharacterMovement>) => {
        setMovementByCharacterId((currentMovementByCharacterId) => ({
            ...currentMovementByCharacterId,
            [characterId]: {
                direction: currentMovementByCharacterId[characterId]?.direction ?? 'right',
                isMoving: currentMovementByCharacterId[characterId]?.isMoving ?? false,
                isSelected: currentMovementByCharacterId[characterId]?.isSelected ?? false,
                ...movement
            }
        }));
    }, []);

    const selectCharacter = useCallback(
        (characterId: string) => {
            setSelectedCharacterId(characterId);
            setMovementByCharacterId((currentMovementByCharacterId) => {
                const nextMovementByCharacterId: CharacterMovementById = {};

                for (const character of characters) {
                    nextMovementByCharacterId[character.id] = {
                        direction: currentMovementByCharacterId[character.id]?.direction ?? 'right',
                        isMoving: currentMovementByCharacterId[character.id]?.isMoving ?? false,
                        isSelected: character.id === characterId
                    };
                }

                return nextMovementByCharacterId;
            });
        },
        [characters]
    );

    const moveSelectedCharacterTo = useCallback(
        (position: Position) => {
            if (!selectedCharacterId) return;

            const selectedCharacter = charactersById.get(selectedCharacterId);
            if (!selectedCharacter) return;

            clearMovementTimeout(selectedCharacterId);

            const path = createStraightPath(selectedCharacter.position, position);
            if (path.length === 0) return;

            const direction = getMovementDirection(selectedCharacter.position, path[0]);

            setMovement(selectedCharacterId, {
                direction,
                isMoving: true,
                isSelected: true
            });

            const moveStep = (stepIndex: number) => {
                const nextPosition = path[stepIndex];
                if (!nextPosition) {
                    setMovement(selectedCharacterId, { isMoving: false });
                    delete movementTimeouts.current[selectedCharacterId];
                    return;
                }

                updateCharacterPosition(selectedCharacterId, nextPosition);

                movementTimeouts.current[selectedCharacterId] = window.setTimeout(() => {
                    moveStep(stepIndex + 1);
                }, STEP_DELAY_MS);
            };

            moveStep(0);
            // setSelectedCharacterId(null);
        },
        [charactersById, clearMovementTimeout, selectedCharacterId, setMovement, updateCharacterPosition]
    );

    const getCharacterMovement = useCallback(
        (characterId: string): CharacterMovement => ({
            direction: movementByCharacterId[characterId]?.direction ?? 'right',
            isMoving: movementByCharacterId[characterId]?.isMoving ?? false,
            isSelected: movementByCharacterId[characterId]?.isSelected ?? false
        }),
        [movementByCharacterId]
    );

    useEffect(() => {
        return () => {
            for (const timeout of Object.values(movementTimeouts.current)) {
                window.clearTimeout(timeout);
            }
        };
    }, []);

    console.log({
        ...getCharacterMovement('1'),
        selectedCharacterId
    });

    return {
        getCharacterMovement,
        moveSelectedCharacterTo,
        selectCharacter
    };
};
