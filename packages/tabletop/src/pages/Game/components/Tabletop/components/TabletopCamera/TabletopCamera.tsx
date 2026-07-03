import { memo, useEffect, type ReactNode } from 'react';
import {
    TransformComponent,
    TransformWrapper,
    useControls,
    useTransformComponent,
    useTransformContext
} from 'react-zoom-pan-pinch';

import S from './TabletopCamera.module.css';
import type { Position } from '../../../../types';

type TabletopCameraProps = {
    children: ReactNode;
    focusId?: string;
    focusPosition?: Position;
};

const FOCUS_SCALE = 1.5;
const FOCUS_ANIMATION_MS = 500;
const FOCUS_MAX_ATTEMPTS = 8;

const isZoomActivationKeyPressed = (keys: string[]) => keys.includes('Meta') || keys.includes('Control');

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

const getBoundedTransformPosition = (params: {
    content: HTMLDivElement;
    positionX: number;
    positionY: number;
    scale: number;
    wrapper: HTMLDivElement;
}) => {
    const { content, positionX, positionY, scale, wrapper } = params;
    const wrapperWidth = wrapper.offsetWidth;
    const wrapperHeight = wrapper.offsetHeight;
    const contentWidth = content.offsetWidth * scale;
    const contentHeight = content.offsetHeight * scale;
    const diffWidth = wrapperWidth - contentWidth;
    const diffHeight = wrapperHeight - contentHeight;
    const scaleWidthFactor = wrapperWidth > contentWidth ? diffWidth * 0.5 : 0;
    const scaleHeightFactor = wrapperHeight > contentHeight ? diffHeight * 0.5 : 0;
    const minPositionX = wrapperWidth - contentWidth - scaleWidthFactor;
    const maxPositionX = scaleWidthFactor;
    const minPositionY = wrapperHeight - contentHeight - scaleHeightFactor;
    const maxPositionY = scaleHeightFactor;

    return {
        positionX: clamp(positionX, minPositionX, maxPositionX),
        positionY: clamp(positionY, minPositionY, maxPositionY)
    };
};

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
            <TabletopCameraFocus focusId={props.focusId} focusPosition={props.focusPosition} />
            <StateBadge />
        </TransformWrapper>
    );
});

function TabletopCameraFocus(props: Pick<TabletopCameraProps, 'focusId' | 'focusPosition'>) {
    const { setTransform } = useControls();
    const context = useTransformContext();

    useEffect(() => {
        const { focusId, focusPosition } = props;
        if (!focusId || !focusPosition) return;

        let animationFrame = 0;
        let attempt = 0;

        const focusCurrentTurnCharacter = () => {
            const wrapper = context.wrapperComponent;
            const content = context.contentComponent;
            if (!wrapper || !content) {
                if (attempt < FOCUS_MAX_ATTEMPTS) {
                    attempt += 1;
                    animationFrame = window.requestAnimationFrame(focusCurrentTurnCharacter);
                }
                return;
            }

            const focusElement = content.querySelector<HTMLElement>(`[data-tabletop-character-id="${focusId}"]`);
            if (!focusElement) {
                if (attempt < FOCUS_MAX_ATTEMPTS) {
                    attempt += 1;
                    animationFrame = window.requestAnimationFrame(focusCurrentTurnCharacter);
                }
                return;
            }

            const wrapperRect = wrapper.getBoundingClientRect();
            const focusRect = focusElement.getBoundingClientRect();
            const focusContentX =
                (focusRect.left + focusRect.width / 2 - wrapperRect.left - context.state.positionX) /
                context.state.scale;
            const focusContentY =
                (focusRect.top + focusRect.height / 2 - wrapperRect.top - context.state.positionY) /
                context.state.scale;
            const targetPositionX = wrapper.offsetWidth / 2 - focusContentX * FOCUS_SCALE;
            const targetPositionY = wrapper.offsetHeight / 2 - focusContentY * FOCUS_SCALE;
            const boundedPosition = getBoundedTransformPosition({
                content,
                positionX: targetPositionX,
                positionY: targetPositionY,
                scale: FOCUS_SCALE,
                wrapper
            });

            setTransform(
                boundedPosition.positionX,
                boundedPosition.positionY,
                FOCUS_SCALE,
                FOCUS_ANIMATION_MS,
                'easeInOutCubic'
            );
        };

        animationFrame = window.requestAnimationFrame(focusCurrentTurnCharacter);

        return () => {
            window.cancelAnimationFrame(animationFrame);
        };
        // Camera focus should react only to active-turn identity and settled cell changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.focusId, props.focusPosition?.x, props.focusPosition?.y]);

    return null;
}

function StateBadge() {
    return useTransformComponent(({ state }) => (
        <div
            style={{
                position: 'absolute',
                bottom: '7rem',
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
