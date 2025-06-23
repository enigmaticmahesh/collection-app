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
    const currDataTracker = useCurrencyStore(state => state.currDataTracker)
    const incCurrency = useCurrencyStore(state => state.incCurrency)
    const decCurrency = useCurrencyStore(state => state.decCurrency)
    const count = currDataTracker.get(note) || 0
    // const countChanges = currChangesTracker.get(note)?.change ? currChangesTracker.get(note)?.changeStr : 0
    
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
                    <h3 style={{fontSize: '24px', fontWeight: 600, marginBottom: '15px'}}>{formatCurrencyINR(+note)}</h3>
                    {/* <Badge count={countChanges} offset={[10, -8]} className="hello">
                        <h3 style={{fontSize: '24px', fontWeight: 600, marginBottom: '15px'}}>{formatCurrencyINR(note)}</h3>
                    </Badge> */}
                    <Title level={4} style={{margin: 0, display: 'flex', gap: '.5rem'}}>{actionHandlerUI}</Title>
                </div>
                <h4 style={{fontSize: '20px', fontWeight: 600, margin: 0, alignSelf: 'flex-end'}}>{formatCurrencyINR(+note * count)}</h4>
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