import { memo, type ReactNode } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import S from './TabletopCamera.module.css';

type TabletopCameraProps = {
    children: ReactNode;
};

const isZoomActivationKeyPressed = (keys: string[]) => keys.includes('Meta') || keys.includes('Control');

export const TabletopCamera = memo((props: TabletopCameraProps) => {
    return (
        <TransformWrapper
            initialScale={0.8}
            minScale={0.35}
            maxScale={2.5}
            centerOnInit
            centerZoomedOut
            limitToBounds
            disablePadding
            wheel={{
                activationKeys: isZoomActivationKeyPressed
            }}
            trackPadPanning={{
                disabled: false,
                activationKeys: (keys) => !isZoomActivationKeyPressed(keys)
            }}
            panning={{
                allowLeftClickPan: true,
                allowMiddleClickPan: false,
                allowRightClickPan: false
                // excluded: ['input', 'button', 'a', 'textarea', 'select', 'label', 'summary']
            }}
            pinch={{
                allowPanning: true
            }}
            doubleClick={{
                disabled: true
            }}
        >
            <TransformComponent wrapperClass={S.viewport} contentClass={S.content}>
                {props.children}
            </TransformComponent>
        </TransformWrapper>
    );
});

TabletopCamera.displayName = 'TabletopCamera';
