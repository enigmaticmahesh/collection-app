import type { FOOTER_TABS, NOTES } from "./constants";

export type fTabValues = typeof FOOTER_TABS[keyof typeof FOOTER_TABS];

export type NameType = {
    name: string;
    place: string;
    amount: number;
}

export type NameTypeWithID = NameType & {
    id: string;
}

export type PartialNameType  = keyof NameType;

export type Currencies = typeof NOTES[number];

export type COLLECTION_TOTAL = {
    namesTotal: number;
    notesTotal: number;
}

export type NOTES_TOTAL = {
    namesTotal: number;
    notesTotal: number;
}

export type NumberMap = {
    [key: number]: number;
};