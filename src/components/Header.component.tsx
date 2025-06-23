import { Card } from "antd"
import { FOOTER_TABS } from "../constants"
import useAppStore from "../store/app.store"
import AddNameBtn from "./AddNameBtn.component"
// import useCurrencyStore from "../store/currency.store"

const Header = () => {
    const { fTab } = useAppStore()
    // const { currData } = useCurrencyStore()
    // console.log({currData})

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