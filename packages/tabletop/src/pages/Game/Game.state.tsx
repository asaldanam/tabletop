import React, { createContext, memo, useMemo, useState } from 'react';

import { useTurnActions } from './hooks/useTurnActions';
import { useCharacterActions } from './hooks/useCharacterActions';
import { useCharacterMovement } from './hooks/useCharacterMovement';
import type {
    Character,
    CharacterMovementView,
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
    endCurrentTurn: () => void;
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
    actions: Character['actions']['list'];
    id: string;
    name: string;
    position: Position;
    sprite: string;
}): Character => ({
    actions: {
        list: params.actions
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
            actions: [
                createAttackAction({
                    damage: 1,
                    description: 'Corte cuerpo a cuerpo contra un personaje adyacente.',
                    icon: 'lorc/saber-slash.svg',
                    id: 'arthur-sword-slash',
                    name: 'Ataque de espada',
                    range: 1
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Estocada firme contra un objetivo cercano.',
                    icon: 'lorc/piercing-sword.svg',
                    id: 'arthur-guard-thrust',
                    name: 'Estocada de guardia',
                    range: 1
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Tajo amplio que alcanza a corta distancia.',
                    icon: 'lorc/blade-fall.svg',
                    id: 'arthur-wide-cut',
                    name: 'Tajo amplio',
                    range: 2
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Golpe descendente con todo el peso de la espada.',
                    icon: 'felbrigg/overhead.svg',
                    id: 'arthur-overhead-blow',
                    name: 'Golpe descendente',
                    range: 1
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Corte rápido pensado para hostigar al rival.',
                    icon: 'felbrigg/sideswipe.svg',
                    id: 'arthur-quick-cut',
                    name: 'Corte rápido',
                    range: 1
                }),
                createAttackAction({
                    damage: 3,
                    description: 'Ataque comprometido de gran daño cuerpo a cuerpo.',
                    icon: 'lorc/shard-sword.svg',
                    id: 'arthur-heroic-cleave',
                    name: 'Mandoble heroico',
                    range: 1
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Proyectil de energía menor canalizado por la espada.',
                    icon: 'lorc/energy-arrow.svg',
                    id: 'arthur-arc-blade',
                    name: 'Hoja arcana',
                    range: 3
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Carga corta contra un enemigo visible.',
                    icon: 'delapouite/attack-gauge.svg',
                    id: 'arthur-short-charge',
                    name: 'Carga corta',
                    range: 2
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Golpe defensivo desde posición protegida.',
                    icon: 'lorc/magic-shield.svg',
                    id: 'arthur-shield-bash',
                    name: 'Golpe de escudo',
                    range: 1
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Corte giratorio contra un objetivo en alcance medio.',
                    icon: 'lorc/dervish-swords.svg',
                    id: 'arthur-spinning-cut',
                    name: 'Corte giratorio',
                    range: 2
                })
            ],
            id: '1',
            name: 'Arthur',
            position: { x: 1, y: 1 },
            sprite: 'arthur.webp'
        }),
        createCharacter({
            actions: [
                createAttackAction({
                    damage: 2,
                    description: 'Golpe pesado de corto alcance.',
                    icon: 'delapouite/3d-hammer.svg',
                    id: 'pangu-hammer-blow',
                    name: 'Martillazo',
                    range: 1
                }),
                createAttackAction({
                    damage: 3,
                    description: 'Mazazo lento que castiga a un rival adyacente.',
                    icon: 'sbed/crush.svg',
                    id: 'pangu-crushing-maul',
                    name: 'Mazazo brutal',
                    range: 1
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Sacudida de tierra que alcanza a corta distancia.',
                    icon: 'sbed/weight-crush.svg',
                    id: 'pangu-ground-shock',
                    name: 'Sacudida',
                    range: 2
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Embestida directa contra un objetivo cercano.',
                    icon: 'sbed/trample.svg',
                    id: 'pangu-trample',
                    name: 'Embestida',
                    range: 2
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Golpe lateral con el mango del arma.',
                    icon: 'felbrigg/sideswipe.svg',
                    id: 'pangu-haft-swipe',
                    name: 'Barrido de mango',
                    range: 1
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Impacto ascendente pensado para romper defensa.',
                    icon: 'felbrigg/underhand.svg',
                    id: 'pangu-rising-hit',
                    name: 'Golpe ascendente',
                    range: 1
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Lanzamiento de piedra a alcance medio.',
                    icon: 'lorc/round-struck.svg',
                    id: 'pangu-stone-throw',
                    name: 'Pedrada',
                    range: 3
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Pisotón que hace daño a un objetivo próximo.',
                    icon: 'sbed/fall-down.svg',
                    id: 'pangu-stomp',
                    name: 'Pisotón',
                    range: 1
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Golpe con hacha rota de corto alcance.',
                    icon: 'delapouite/broken-axe.svg',
                    id: 'pangu-broken-axe',
                    name: 'Hachazo tosco',
                    range: 1
                }),
                createAttackAction({
                    damage: 3,
                    description: 'Impacto concentrado que requiere estar adyacente.',
                    icon: 'sbed/overkill.svg',
                    id: 'pangu-overkill',
                    name: 'Aplastamiento',
                    range: 1
                })
            ],
            id: '2',
            name: 'Pangu',
            position: { x: 2, y: 1 },
            sprite: 'pangu.webp'
        }),
        createCharacter({
            actions: [
                createAttackAction({
                    damage: 2,
                    description: 'Ráfaga ígnea contra un objetivo cercano.',
                    icon: 'lorc/fire-breath.svg',
                    id: 'agumon-fire-breath',
                    name: 'Aliento ígneo',
                    range: 3
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Llama pequeña de alcance medio.',
                    icon: 'lorc/small-fire.svg',
                    id: 'agumon-small-flame',
                    name: 'Llamita',
                    range: 4
                }),
                createAttackAction({
                    damage: 3,
                    description: 'Explosión ardiente contra un objetivo lejano.',
                    icon: 'lorc/burning-meteor.svg',
                    id: 'agumon-burning-meteor',
                    name: 'Meteorito ardiente',
                    range: 5
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Túnel de fuego canalizado en línea corta.',
                    icon: 'lorc/flame-tunnel.svg',
                    id: 'agumon-flame-tunnel',
                    name: 'Túnel de llama',
                    range: 4
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Chispa explosiva contra un objetivo cercano.',
                    icon: 'lorc/squib.svg',
                    id: 'agumon-spark-pop',
                    name: 'Chispa',
                    range: 3
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Bola de fuego comprimida.',
                    icon: 'sbed/fire.svg',
                    id: 'agumon-fireball',
                    name: 'Bola de fuego',
                    range: 4
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Llamarada de corto alcance.',
                    icon: 'sbed/flamer.svg',
                    id: 'agumon-flamer',
                    name: 'Llamarada',
                    range: 2
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Quemadura precisa contra un objetivo cercano.',
                    icon: 'sbed/burn.svg',
                    id: 'agumon-burn',
                    name: 'Quemadura',
                    range: 3
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Explosión punzante de calor.',
                    icon: 'lorc/spiky-explosion.svg',
                    id: 'agumon-heat-burst',
                    name: 'Estallido térmico',
                    range: 3
                }),
                createAttackAction({
                    damage: 3,
                    description: 'Lava proyectada contra un enemigo a distancia.',
                    icon: 'sbed/lava.svg',
                    id: 'agumon-lava-shot',
                    name: 'Disparo de lava',
                    range: 4
                })
            ],
            id: '3',
            name: 'Agumon',
            position: { x: 1, y: 2 },
            sprite: 'agumon.webp'
        }),
        createCharacter({
            actions: [
                createAttackAction({
                    damage: 1,
                    description: 'Proyectil eléctrico de alcance medio.',
                    icon: 'lorc/charged-arrow.svg',
                    id: 'tentomon-charged-shot',
                    name: 'Disparo cargado',
                    range: 4
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Descarga eléctrica contra un objetivo cercano.',
                    icon: 'sbed/electric.svg',
                    id: 'tentomon-electric-shot',
                    name: 'Descarga',
                    range: 3
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Rayo tenso de largo alcance.',
                    icon: 'sbed/tesla.svg',
                    id: 'tentomon-tesla-ray',
                    name: 'Rayo tesla',
                    range: 5
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Frecuencia eléctrica que busca un objetivo.',
                    icon: 'lorc/lightning-frequency.svg',
                    id: 'tentomon-frequency',
                    name: 'Frecuencia',
                    range: 4
                }),
                createAttackAction({
                    damage: 3,
                    description: 'Tormenta concentrada a distancia.',
                    icon: 'lorc/lightning-storm.svg',
                    id: 'tentomon-storm',
                    name: 'Tormenta',
                    range: 5
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Disparo de precisión contra objetivo lejano.',
                    icon: 'delapouite/crosshair.svg',
                    id: 'tentomon-aimed-shot',
                    name: 'Disparo preciso',
                    range: 5
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Láser corto desde el cuerno.',
                    icon: 'sbed/laser-gun.svg',
                    id: 'tentomon-horn-laser',
                    name: 'Láser de cuerno',
                    range: 4
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Marcado láser que inflige daño directo.',
                    icon: 'sbed/target-laser.svg',
                    id: 'tentomon-target-laser',
                    name: 'Marcado láser',
                    range: 5
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Picadura a un enemigo adyacente.',
                    icon: 'lorc/bee.svg',
                    id: 'tentomon-sting',
                    name: 'Picadura',
                    range: 1
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Pulso de reactor de alcance medio.',
                    icon: 'sbed/reactor.svg',
                    id: 'tentomon-reactor-pulse',
                    name: 'Pulso reactor',
                    range: 3
                })
            ],
            id: '4',
            name: 'Tentomon',
            position: { x: 2, y: 2 },
            sprite: 'tentomon.webp'
        }),
        createCharacter({
            actions: [
                createAttackAction({
                    damage: 2,
                    description: 'Ataque preciso contra un enemigo adyacente.',
                    icon: 'lorc/piercing-sword.svg',
                    id: 'alexander-thrust',
                    name: 'Estocada',
                    range: 1
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Corte de espada rápido y cercano.',
                    icon: 'lorc/saber-slash.svg',
                    id: 'alexander-saber-cut',
                    name: 'Corte de sable',
                    range: 1
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Ataque de lanza a corta distancia.',
                    icon: 'felbrigg/thrust.svg',
                    id: 'alexander-spear-thrust',
                    name: 'Lanza corta',
                    range: 2
                }),
                createAttackAction({
                    damage: 3,
                    description: 'Corte pesado contra un objetivo adyacente.',
                    icon: 'lorc/blade-drag.svg',
                    id: 'alexander-heavy-cut',
                    name: 'Corte pesado',
                    range: 1
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Finta que termina en un golpe menor.',
                    icon: 'generalace135/fingers-crossed.svg',
                    id: 'alexander-feint',
                    name: 'Finta',
                    range: 1
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Doble filo contra un objetivo cercano.',
                    icon: 'delapouite/light-sabers.svg',
                    id: 'alexander-dual-edge',
                    name: 'Doble filo',
                    range: 1
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Corte curvo de corto alcance.',
                    icon: 'lorc/curvy-knife.svg',
                    id: 'alexander-curved-cut',
                    name: 'Corte curvo',
                    range: 1
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Duelista presiona a un rival cercano.',
                    icon: 'sbed/duel.svg',
                    id: 'alexander-duel',
                    name: 'Duelo',
                    range: 1
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Ataque técnico desde una postura segura.',
                    icon: 'delapouite/switch-weapon.svg',
                    id: 'alexander-weapon-switch',
                    name: 'Cambio técnico',
                    range: 2
                }),
                createAttackAction({
                    damage: 3,
                    description: 'Golpe definitivo contra un enemigo adyacente.',
                    icon: 'lorc/decapitation.svg',
                    id: 'alexander-finisher',
                    name: 'Remate',
                    range: 1
                })
            ],
            id: '5',
            name: 'Alexander',
            position: { x: 3, y: 1 },
            sprite: 'alexander.webp'
        }),
        createCharacter({
            actions: [
                createAttackAction({
                    damage: 3,
                    description: 'Conjuro de fuego contra un objetivo a distancia.',
                    icon: 'lorc/small-fire.svg',
                    id: 'black-mage-minor-flame',
                    name: 'Llama menor',
                    range: 4
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Rayo arcano de alcance medio.',
                    icon: 'lorc/triorb.svg',
                    id: 'black-mage-arcane-ray',
                    name: 'Rayo arcano',
                    range: 4
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Proyectil mágico simple.',
                    icon: 'lorc/orbital.svg',
                    id: 'black-mage-magic-bolt',
                    name: 'Proyectil mágico',
                    range: 5
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Ráfaga musical que hiere a distancia.',
                    icon: 'lorc/music-spell.svg',
                    id: 'black-mage-music-spell',
                    name: 'Hechizo sonoro',
                    range: 4
                }),
                createAttackAction({
                    damage: 3,
                    description: 'Vórtice oscuro contra un objetivo lejano.',
                    icon: 'lorc/vortex.svg',
                    id: 'black-mage-vortex',
                    name: 'Vórtice',
                    range: 5
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Rayo de cráneo cargado.',
                    icon: 'lorc/skull-bolt.svg',
                    id: 'black-mage-skull-bolt',
                    name: 'Rayo óseo',
                    range: 4
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Explosión experimental menor.',
                    icon: 'lorc/soap-experiment.svg',
                    id: 'black-mage-experiment',
                    name: 'Experimento',
                    range: 3
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Disparo de energía concentrada.',
                    icon: 'sbed/blast.svg',
                    id: 'black-mage-energy-blast',
                    name: 'Descarga arcana',
                    range: 4
                }),
                createAttackAction({
                    damage: 3,
                    description: 'Cañón menor de energía oscura.',
                    icon: 'sbed/lucifer-cannon.svg',
                    id: 'black-mage-dark-cannon',
                    name: 'Cañón oscuro',
                    range: 5
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Maldición leve de alcance medio.',
                    icon: 'lorc/paranoia.svg',
                    id: 'black-mage-hex',
                    name: 'Maldición leve',
                    range: 4
                })
            ],
            id: '6',
            name: 'Black Mage',
            position: { x: 4, y: 1 },
            sprite: 'black-mage.webp'
        }),
        createCharacter({
            actions: [
                createAttackAction({
                    damage: 2,
                    description: 'Impacto concentrado cuerpo a cuerpo.',
                    icon: 'lorc/punch-blast.svg',
                    id: 'goku-ki-strike',
                    name: 'Golpe ki',
                    range: 1
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Puñetazo rápido contra un enemigo adyacente.',
                    icon: 'lorc/mailed-fist.svg',
                    id: 'goku-fast-punch',
                    name: 'Puñetazo rápido',
                    range: 1
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Patada que cubre corta distancia.',
                    icon: 'sbed/pounce.svg',
                    id: 'goku-flying-kick',
                    name: 'Patada voladora',
                    range: 2
                }),
                createAttackAction({
                    damage: 3,
                    description: 'Onda de energía de alcance medio.',
                    icon: 'sbed/blast.svg',
                    id: 'goku-ki-blast',
                    name: 'Onda ki',
                    range: 4
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Ráfaga de proyectiles de energía.',
                    icon: 'lorc/bullets.svg',
                    id: 'goku-ki-barrage',
                    name: 'Ráfaga ki',
                    range: 3
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Golpe de palma cercano.',
                    icon: 'lorc/palm.svg',
                    id: 'goku-palm-strike',
                    name: 'Palma',
                    range: 1
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Ataque veloz desde corta distancia.',
                    icon: 'lorc/whiplash.svg',
                    id: 'goku-flash-hit',
                    name: 'Golpe fugaz',
                    range: 2
                }),
                createAttackAction({
                    damage: 3,
                    description: 'Explosión circular de energía.',
                    icon: 'lorc/spiky-explosion.svg',
                    id: 'goku-ki-burst',
                    name: 'Explosión ki',
                    range: 3
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Ataque medido contra un objetivo próximo.',
                    icon: 'delapouite/human-target.svg',
                    id: 'goku-targeted-hit',
                    name: 'Golpe medido',
                    range: 2
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Doble impacto cuerpo a cuerpo.',
                    icon: 'sbed/doubled.svg',
                    id: 'goku-double-hit',
                    name: 'Doble impacto',
                    range: 1
                })
            ],
            id: '7',
            name: 'Goku',
            position: { x: 3, y: 2 },
            sprite: 'goku.webp'
        }),
        createCharacter({
            actions: [
                createAttackAction({
                    damage: 1,
                    description: 'Ataque improvisado con alcance corto.',
                    icon: 'lorc/firework-rocket.svg',
                    id: 'sinchan-mischief-rocket',
                    name: 'Cohete travieso',
                    range: 3
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Bomba pequeña de broma.',
                    icon: 'lorc/time-bomb.svg',
                    id: 'sinchan-prank-bomb',
                    name: 'Bomba broma',
                    range: 3
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Petardo directo contra un objetivo cercano.',
                    icon: 'sbed/grenade.svg',
                    id: 'sinchan-firecracker',
                    name: 'Petardo',
                    range: 3
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Gesto absurdo que acaba haciendo daño.',
                    icon: 'caro-asercion/prank-glasses.svg',
                    id: 'sinchan-prank',
                    name: 'Broma pesada',
                    range: 2
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Disparo de juguete a alcance medio.',
                    icon: 'sbed/blaster.svg',
                    id: 'sinchan-toy-blaster',
                    name: 'Pistola juguete',
                    range: 4
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Ataque caótico con objeto contundente.',
                    icon: 'caro-asercion/stapler.svg',
                    id: 'sinchan-stapler-hit',
                    name: 'Grapadora',
                    range: 1
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Salto torpe contra un rival cercano.',
                    icon: 'delapouite/frisbee.svg',
                    id: 'sinchan-wild-jump',
                    name: 'Salto salvaje',
                    range: 2
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Choque improvisado de corto alcance.',
                    icon: 'sbed/telefrag.svg',
                    id: 'sinchan-chaos-hit',
                    name: 'Choque caótico',
                    range: 2
                }),
                createAttackAction({
                    damage: 1,
                    description: 'Golpe mínimo con precisión dudosa.',
                    icon: 'sbed/trigger-hurt.svg',
                    id: 'sinchan-trigger-hurt',
                    name: 'Tropiezo hiriente',
                    range: 1
                }),
                createAttackAction({
                    damage: 2,
                    description: 'Gran final ruidoso de alcance medio.',
                    icon: 'lorc/spiky-explosion.svg',
                    id: 'sinchan-grand-finale',
                    name: 'Gran final',
                    range: 3
                })
            ],
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
                            endCurrentTurn,
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
                            endCurrentTurn,
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
