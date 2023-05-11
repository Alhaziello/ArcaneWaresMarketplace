import { BaseKey } from '@pankod/refine-core';

export interface ProviderCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    avatar: string,
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}
