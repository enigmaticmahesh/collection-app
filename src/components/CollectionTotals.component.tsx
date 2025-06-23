import { Card } from "antd"
import useCollectionTotals from "../hooks/useCollectionTotals"
import { formatCurrencyINR } from "../utils"

const CollectionTotals = () => {
    const { collectionTotals } = useCollectionTotals()
    console.log({collectionTotals})
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '.5rem'}}>
            <Card variant="borderless">
                <h4 style={{fontSize: '20px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <p>Names: </p>
                    <p>{formatCurrencyINR(collectionTotals.namesTotal)}</p>
                </h4>
            </Card>
            <Card variant="borderless">
                <h4 style={{fontSize: '20px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <p>Notes: </p>
                    <p>{formatCurrencyINR(collectionTotals.notesTotal)}</p>
                </h4>
            </Card>
        </div>
    )
}

export default CollectionTotals