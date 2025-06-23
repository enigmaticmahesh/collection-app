import useCurrencyTotals from "../hooks/useCurrencyTotals"

const NotesSubscriber = () => {
    useCurrencyTotals()
    console.log('NoteSubscriber')
    return null;
}

export default NotesSubscriber