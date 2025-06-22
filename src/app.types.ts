import type { FOOTER_TABS } from "./constants";

export type fTabValues = typeof FOOTER_TABS[keyof typeof FOOTER_TABS];

export type NameType = {
    name: string;
    place: string;
    amount: number;
}

export type PartialNameType  = keyof NameType;