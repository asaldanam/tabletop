import { memo } from 'react';

import S from './TabletopCharacterShadow.module.css';

export const TabletopCharacterShadow = memo(() => {
    return <div className={S.shadow} aria-hidden="true" />;
});

TabletopCharacterShadow.displayName = 'TabletopCharacterShadow';
