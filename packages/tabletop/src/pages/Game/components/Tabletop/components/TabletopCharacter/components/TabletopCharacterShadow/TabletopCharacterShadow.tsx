import { memo } from 'react';

import S from './TabletopCharacterShadow.module.css';

type TabletopCharacterShadowProps = {
    show: boolean;
};

export const TabletopCharacterShadow = memo((props: TabletopCharacterShadowProps) => {
    return (
        <div
            className={S.shadow}
            style={{
                opacity: props.show ? 1 : 0,
                transform: props.show ? 'translateZ(0) scale(1)' : 'translateZ(0) scale(1.75)'
            }}
            aria-hidden="true"
        />
    );
});

TabletopCharacterShadow.displayName = 'TabletopCharacterShadow';
