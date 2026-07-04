export type ToolbarTool = {
    hasContextPanel?: boolean;
    icon: string;
    id: 'actions' | 'endTurn' | 'movement' | 'reactions';
    isActive?: boolean;
    isDisabled?: boolean;
    label: string;
    onPointerDown?: () => void;
    variant?: 'danger' | 'default';
};
