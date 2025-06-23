import { Card, Spin } from "antd"
import { smallPaddingCardStyles } from "../constants"
import useNames from "../hooks/useNames"
import { formatCurrencyINR } from "../utils"
import { delName } from "../firebase/names.service"

const NamesListData = () => {
    const { names, loading } = useNames()

    const handleDelete = (docID: string) =>  async() => {
        const { res, err } = await delName(docID)
        if (err) {
            console.log({err})
            return
        }
        console.log({res})
    }

    if (loading) {
        return (
            <Spin tip="Loading" size="large">
                <div style={{padding: 50, background: 'rgba(0, 0, 0, 0.05)', borderRadius: 4}}></div>
            </Spin>
        )
    }

    const nameItem = (nameData: any, i: number) => {
        return (
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <p style={{alignSelf: 'flex-start'}}>{i + 1}.</p>
                <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                    <p style={{margin: 0}}>{nameData.name}</p>
                    {nameData.place}
                </div>
                {formatCurrencyINR(nameData.amount)}
                <p onClick={handleDelete(nameData.id)} style={{cursor: 'pointer', paddingRight: '.5rem', display: 'inline-flex', color: 'red'}}>
                    <i className="iconoir-bin-minus-in"></i>
                </p>
            </div>
        )
    }
    const namesList = names.map((nameData: any, i: number) => <Card key={nameData.id} variant="borderless" styles={smallPaddingCardStyles}>{nameItem(nameData, i)}</Card>)

    return <div style={{display: 'flex', flexDirection: 'column', gap: '.5rem'}}>{namesList}</div>
}

const NamesList = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '.5rem'}}>
            {/* <AddName /> */}
            <NamesListData />
        </div>
    )
}

export default NamesList