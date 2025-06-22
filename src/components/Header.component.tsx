import { Button, Card, Drawer, Input, InputNumber } from "antd"
import useAddName from "../hooks/useAddName"
import { useReducer, useState } from "react"
import type { PartialNameType } from "../app.types"
import { FOOTER_TABS, smallPaddingCardStyles } from "../constants"
import { CloseOutlined } from "@ant-design/icons"
import useAppStore from "../store/app.store"

const NAME_DATA = {name: '', amount: 1, place: ''}
const AddName = () => {
    const { addName, loading } = useAddName()
    const [nameData, updateNameData] = useReducer((prev: any, next: any) => ({...prev, ...next}), NAME_DATA)

    const handleData = (field: PartialNameType) => (e: any) => {
        const value = field !== 'amount' ? e.target.value : e
        updateNameData({[field]: value})
    }
    const handleNewEntry = () => {
        if (loading) return
        addName(nameData)
        updateNameData(NAME_DATA)
    }

    const btn = loading ? 'Saving' : 'Save'
    return (
        <Card variant="borderless" styles={smallPaddingCardStyles}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem', flex: 1}}>
                <Input placeholder="Name" value={nameData.name} onChange={handleData('name')} />
                <Input placeholder="Place" value={nameData.place} onChange={handleData('place')} />
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <InputNumber min={1} defaultValue={1} value={nameData.amount} onChange={handleData('amount')} />
                    <Button type="primary" onClick={handleNewEntry} loading={loading} iconPosition="end" disabled={loading}>{btn}</Button>
                </div>
            </div>
        </Card>
    )
}

const AddNameBtn = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const closeBtn = (
        <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
        />
    )
    return (
        <>
            <Drawer
                title="Add Person"
                placement="bottom"
                closable={false}
                onClose={onClose}
                open={open}
                height="75%"
                destroyOnHidden={true}
                extra={closeBtn}
            >
                <AddName />
            </Drawer>
            <Button type="primary" onClick={showDrawer}>Add</Button>
        </>
    )
}

const Header = () => {
    const { fTab } = useAppStore()

    const addPersonUI = fTab === FOOTER_TABS.NAMES && <AddNameBtn />
    return (
        <nav>
            <Card variant="borderless">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h4 style={{fontSize: '20px', fontWeight: 600, margin: 0}}>Collections</h4>
                    {addPersonUI}
                </div>
            </Card>
        </nav>
    )
}

export default Header