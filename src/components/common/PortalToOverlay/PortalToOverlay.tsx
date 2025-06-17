'use client';

import { OVERLAY_LAYER_ID } from '@/vars';
import { isSSR } from '@lesnoypudge/utils-react';
import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';



type PortalToOverlayProps = (
    PropsWithChildren
    & {
        enabled: boolean;
    }
);

// eslint-disable-next-line unicorn/prefer-query-selector
const layer = isSSR() ? null : document.getElementById(OVERLAY_LAYER_ID)!;

export const PortalToOverlay: FC<PortalToOverlayProps> = ({
    enabled,
    children,
}) => {
    if (!enabled) return null;
    if (!layer) return;

    return createPortal(children, layer);
};