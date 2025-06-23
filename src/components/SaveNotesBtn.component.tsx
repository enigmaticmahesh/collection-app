import { Button } from "antd"
import { updateNotes } from "../firebase/names.service"
import useCurrencyStore from "../store/currency.store"
import { useState } from "react"

const SaveNotesBtn = () => {
    const currDataTracker = useCurrencyStore(state => state.currDataTracker)
    const hasChanged = useCurrencyStore(state => state.hasChanged)
    const [loading, setLoading] = useState(false)

    const saveNoteChanges = async () => {
        setLoading(true)
        console.log({currDataTracker})
        const notesData = Object.fromEntries(currDataTracker)
        console.log({notesData})
        const { res, err } = await updateNotes(notesData)
        setLoading(false)
        if (err) {
            console.log({err})
            return
        }
        console.log({res})
    }

    if (!hasChanged) return

    const btn = loading ? 'Saving' : 'Save'
    return (
        <>
            <Button type="primary" onClick={saveNoteChanges} loading={loading} iconPosition="end">{btn}</Button>
        </>
    )
}

export default SaveNotesBtn