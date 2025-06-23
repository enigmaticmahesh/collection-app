import { useReducer, useState } from "react"
import useAppStore from "../store/app.store"
import type { PartialNameType } from "../app.types"
import { saveName } from "../firebase/names.service"
import { Button, Card, Input, InputNumber } from "antd"
import { FOOTER_TABS, smallPaddingCardStyles } from "../constants"

const NAME_DATA = {name: '', amount: 1, place: ''}

const AddName = () => {
    const { setFTab } = useAppStore()
    const [loading, setLoading] = useState(false)
    const [nameData, updateNameData] = useReducer((prev: any, next: any) => ({...prev, ...next}), NAME_DATA)

    const isDataValid = () => {
        if (loading) return false
        if (nameData.amount < 1) return false
        if (nameData.amount > 0) return true
        return false
    }
    const handleData = (field: PartialNameType) => (e: any) => {
        const value = field !== 'amount' ? e.target.value : e
        updateNameData({[field]: value})
    }
    const handleNewEntry = async () => {
        if (!isDataValid()) return
        setLoading(true)
        const { res, err } = await saveName(nameData)
        setLoading(false)
        if (err) {
            console.log({err})
            return
        }
        console.log({res})
        updateNameData(NAME_DATA)
        setFTab(FOOTER_TABS.NOTES)
    }

    const btn = loading ? 'Saving' : 'Save'
    return (
        <Card variant="borderless" styles={smallPaddingCardStyles}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem', flex: 1}}>
                <Input placeholder="Name" value={nameData.name} onChange={handleData('name')} />
                <Input placeholder="Place" value={nameData.place} onChange={handleData('place')} />
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <InputNumber prefix="₹" min={0} defaultValue={1} value={nameData.amount} onChange={handleData('amount')} />
                    <Button type="primary" onClick={handleNewEntry} loading={loading} iconPosition="end" disabled={!isDataValid()}>{btn}</Button>
                </div>
            </div>
        </Card>
    )
}

export default AddName