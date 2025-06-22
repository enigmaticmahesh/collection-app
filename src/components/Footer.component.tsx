import { Card } from "antd"
import useToken from "antd/es/theme/useToken";
import Title from "antd/es/typography/Title";
import useAppStore from "../store/app.store";
import { FOOTER_TABS, smallPaddingCardStyles } from "../constants";
import type { fTabValues } from "../app.types";

const basicStyles = {margin: 0, display: 'inline-flex', padding: '10px'}

const Footer = () => {
    const [_, token] = useToken();
    const { fTab, setFTab } = useAppStore()

    const handleTab = (tab: fTabValues) => () => {
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