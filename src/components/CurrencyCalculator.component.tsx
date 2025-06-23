import Title from "antd/es/typography/Title"
import { formatCurrencyINR } from "../utils"
import { Button, Card } from "antd"
import { NOTES } from "../constants"
import useCurrencyStore from "../store/currency.store"
import type { Currencies } from "../app.types"

type NoteCalculatorProps = {
    note: Currencies
}

const NoteCalculator = ({note}: NoteCalculatorProps) => {
    const { currDataTracker, incCurrency, decCurrency } = useCurrencyStore()
    const count = currDataTracker.get(note) || 0
    
    const incCount = () => incCurrency(note)
    const decCount = () => decCurrency(note)

    const actionHandlerUI = (
        <div style={{display: 'flex', gap: '.5rem', alignItems: 'center'}}>
            <Button type="primary" shape="round" onClick={decCount}><i className="iconoir-minus-circle"></i></Button>
            {count}
            <Button type="primary" shape="round" onClick={incCount}><i className="iconoir-plus-circle"></i></Button>
        </div>
    )

    return (
        <Card variant="borderless">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <h4 style={{fontSize: '20px', fontWeight: 600}}>{formatCurrencyINR(note)}</h4>
                    <Title level={4} style={{margin: 0, display: 'flex', gap: '.5rem'}}>{actionHandlerUI}</Title>
                </div>
                <h4 style={{fontSize: '20px', fontWeight: 600, margin: 0, alignSelf: 'flex-end'}}>{formatCurrencyINR(note * count)}</h4>
            </div>
        </Card>
    )
}

const CurrencyCalculator = () => {
    const notesList = NOTES.map(note => <NoteCalculator key={note} note={note} />)
    return (
        <div className="currency-calculator-component">
            {notesList}
        </div>
    )
}

export default CurrencyCalculator