import { create } from "zustand";
import { NOTES } from "../constants";
import type { Currencies } from "../app.types";

type NumberMap = {
    [key: number]: number;
};

interface CurrencyState {
  currDataTracker: Map<Currencies, number>
  currData: NumberMap[]
  updateCurrency: (currencyData: NumberMap) => void
  incCurrency: (currency: Currencies) => void
  decCurrency: (currency: Currencies) => void
}

const INITIAL_STATE = {
    currDataTracker: new Map(NOTES.map(note => [note, 0])),
    currData: NOTES.map(note => ({[note]: 0}))
}

const useCurrencyStore = create<CurrencyState>((set, get) => ({
    ...INITIAL_STATE,
    updateCurrency: (currencyData: NumberMap) => {
        console.log({currencyData})
        const [[keyStr, value]] = Object.entries(currencyData);
        const key = Number(keyStr) as Currencies;

        const prevTracker = get().currDataTracker;
        prevTracker.set(key, value)
        console.log({prevTracker})

        const currDataTracker = new Map(prevTracker)
        const currData = Array.from(prevTracker).map(([key, value]) => ({ [key]: value }));
        set(state => ({...state, currDataTracker, currData}))
    },
    incCurrency: (currency: Currencies) => {
        const prevTracker = get().currDataTracker;
        const prevCount = prevTracker.get(currency) || 0
        prevTracker.set(currency, prevCount + 1)

        const currDataTracker = new Map(prevTracker)
        const currData = Array.from(prevTracker).map(([key, value]) => ({ [key]: value }));
        set(state => ({...state, currDataTracker, currData}))
    },
    decCurrency: (currency: Currencies) => {
        const prevTracker = get().currDataTracker;
        const prevCount = prevTracker.get(currency) || 0
        if (prevCount < 1) return
        prevTracker.set(currency, prevCount - 1)

        const currDataTracker = new Map(prevTracker)
        const currData = Array.from(prevTracker).map(([key, value]) => ({ [key]: value }));
        set(state => ({...state, currDataTracker, currData}))
    }
}))

export default useCurrencyStore