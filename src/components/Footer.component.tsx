import { Card, message } from "antd"
import useToken from "antd/es/theme/useToken";
import Title from "antd/es/typography/Title";
import useAppStore from "../store/app.store";
import { FOOTER_TABS, smallPaddingCardStyles } from "../constants";
import type { fTabValues } from "../app.types";
import useCurrencyStore from "../store/currency.store";

const basicStyles = {margin: 0, display: 'inline-flex', padding: '10px'}

const Footer = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const hasChanged = useCurrencyStore(state => state.hasChanged)
    const [_, token] = useToken();
    const { fTab, setFTab } = useAppStore()

    const handleTab = (tab: fTabValues) => () => {
        if (fTab === tab) return
        if (fTab === FOOTER_TABS.NOTES && hasChanged) {
            messageApi.open({
                type: 'warning',
                content: 'Please, save the changes',
            });
            return
        }
        setFTab(tab)
    }
    const primaryColor = token.colorPrimary;
    const activeTabStyle = {backgroundColor: primaryColor, color: 'white', borderRadius: '50%'}

    const tabStyles = (tab: fTabValues) => {
        if (fTab === tab) return {...basicStyles, ...activeTabStyle}
        return basicStyles
    }

    return (
        <footer>
            {contextHolder}
            <Card variant="borderless" styles={smallPaddingCardStyles}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Title onClick={handleTab(FOOTER_TABS.NOTES)} level={2} style={tabStyles(FOOTER_TABS.NOTES)} role="button"><i className="iconoir-lot-of-cash"></i></Title>
                    <Title onClick={handleTab(FOOTER_TABS.NAMES)} level={2} style={tabStyles(FOOTER_TABS.NAMES)} role="button"><i className="iconoir-menu"></i></Title>
                    <Title onClick={handleTab(FOOTER_TABS.TOTAL)} level={2} style={tabStyles(FOOTER_TABS.TOTAL)} role="button"><i className="iconoir-reports"></i></Title>
                </div>
            </Card>
        </footer>
    )
}

export default Footer