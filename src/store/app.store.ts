import { create } from "zustand";
import { FOOTER_TABS } from "../constants";
import type { fTabValues } from "../app.types";

interface AppState {
  fTab: fTabValues
  setFTab: (tab: fTabValues) => void
}

const useAppStore = create<AppState>((set) => ({
    fTab: FOOTER_TABS.NOTES,
    setFTab: (tab: fTabValues) => set((state) => ({...state, fTab: tab}))
}))
export default useAppStore