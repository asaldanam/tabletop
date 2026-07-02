import { memo } from 'react';

import S from './TabletopCharacterPin.module.css';

export const TabletopCharacterPin = memo(() => {
    return <div className={S.pin} aria-hidden="true" />;
});

TabletopCharacterPin.displayName = 'TabletopCharacterPin';
