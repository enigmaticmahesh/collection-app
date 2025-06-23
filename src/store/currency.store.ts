import { create } from "zustand";
import { DEFAULT_CHANGE, NOTES } from "../constants";
import type { Currencies, NumberMap } from "../app.types";

type Changes = {
    change: number;
    changeStr: string;
};

type CurrencyData = {
    [key in Currencies]: number;
};

interface CurrencyState {
  currDataTracker: Map<Currencies, number>
  currData: NumberMap[]
  currChangesTracker: Map<Currencies, Changes>
  hasChanged: boolean
//   updateCurrency: (currencyData: NumberMap) => void
  setCurrency: (apiData: CurrencyData) => void
  incCurrency: (currency: Currencies) => void
  decCurrency: (currency: Currencies) => void
}

const INITIAL_STATE = {
    currDataTracker: new Map(NOTES.map(note => [note, 0])),
    currData: NOTES.map(note => ({[note]: 0})),
    currChangesTracker: new Map(NOTES.map(note =>([note, DEFAULT_CHANGE]))),
    hasChanged: false // temporary
}

const useCurrencyStore = create<CurrencyState>((set, get) => ({
    ...INITIAL_STATE,
    setCurrency: (apiData: CurrencyData) => {
        // console.log({apiData})
        // const [[keyStr, value]] = Object.entries(apiData);
        // const key = Number(keyStr) as Currencies;
        const apiNotes = new Map(Object.entries(apiData)) as any
        // console.log({apiNotes})
        set(state => ({...state, currDataTracker: apiNotes, hasChanged: false}))
    },
    incCurrency: (currency: Currencies) => {
        const prevTracker = get().currDataTracker;
        const prevCount = prevTracker.get(currency) || 0
        prevTracker.set(currency, prevCount + 1)
        
        const prevChangesTr = get().currChangesTracker;
        const prevChanges = prevChangesTr.get(currency) || DEFAULT_CHANGE
        const change = prevChanges.change + 1
        const changeStr = `+${prevChanges.change + 1}`
        prevChangesTr.set(currency, {change, changeStr})

        const currDataTracker = new Map(prevTracker)
        const currData = Array.from(prevTracker).map(([key, value]) => ({ [key]: value }));
        set(state => ({...state, currDataTracker, currData, hasChanged: true}))
    },
    decCurrency: (currency: Currencies) => {
        const prevTracker = get().currDataTracker;
        const prevCount = prevTracker.get(currency) || 0

        if (prevCount < 1) return
        prevTracker.set(currency, prevCount - 1)

        // const prevChangesTr = get().currChangesTracker;
        // const prevChanges = prevChangesTr.get(currency) || DEFAULT_CHANGE
        // const change = prevChanges.change - 1
        // const changeStr = `-${prevChanges.change - 1}`
        // prevChangesTr.set(currency, {change, changeStr})

        const currDataTracker = new Map(prevTracker)
        const currData = Array.from(prevTracker).map(([key, value]) => ({ [key]: value }));
        set(state => ({...state, currDataTracker, currData, hasChanged: true}))
    }
}))

export default useCurrencyStore