import { memo, type ReactNode } from 'react';
import { TransformComponent, TransformWrapper, useTransformComponent } from 'react-zoom-pan-pinch';

import S from './TabletopCamera.module.css';

type TabletopCameraProps = {
    children: ReactNode;
};

const isZoomActivationKeyPressed = (keys: string[]) => keys.includes('Meta') || keys.includes('Control');

export const TabletopCamera = memo((props: TabletopCameraProps) => {
    return (
        <TransformWrapper
            initialScale={1}
            minScale={0.35}
            maxScale={2.5}
            centerOnInit
            centerZoomedOut
            limitToBounds
            disablePadding
            velocityAnimation={{
                animationType: 'easeInOutCubic',
                sensitivityMouse: 2,
                inertia: 0.35
            }}
            wheel={{
                activationKeys: isZoomActivationKeyPressed
            }}
            trackPadPanning={{
                disabled: false,
                activationKeys: (keys) => !isZoomActivationKeyPressed(keys)
            }}
            panning={{
                allowLeftClickPan: true,
                allowMiddleClickPan: true,
                allowRightClickPan: true
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
            {/* <StateBadge /> */}
        </TransformWrapper>
    );
});

function StateBadge() {
    return useTransformComponent(({ state }) => (
        <div
            style={{
                position: 'absolute',
                bottom: 14,
                left: 14,
                zIndex: 10,
                padding: '8px 12px',
                borderRadius: 10,
                background: 'rgba(10, 10, 18, 0.88)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: "'SF Mono', 'Fira Code', ui-monospace, monospace",
                fontSize: 11,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.6)',
                userSelect: 'none',
                pointerEvents: 'none'
            }}
        >
            <div>
                <span style={{ color: '#818cf8' }}>scale</span>: {state.scale.toFixed(2)}
            </div>
            <div>
                <span style={{ color: '#34d399' }}>positionX</span>: {state.positionX.toFixed(0)}
            </div>
            <div>
                <span style={{ color: '#f9a8d4' }}>positionY</span>: {state.positionY.toFixed(0)}
            </div>
        </div>
    ));
}

TabletopCamera.displayName = 'TabletopCamera';
