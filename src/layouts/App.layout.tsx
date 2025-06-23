import Footer from "../components/Footer.component"
import Header from "../components/Header.component"
import { FOOTER_TABS } from "../constants"
import CurrencyCalculator from "../components/CurrencyCalculator.component"
import useAppStore from "../store/app.store"
import NamesList from "../components/NamesList.component"
import CollectionTotals from "../components/CollectionTotals.component"

const MainContent = () => {
    const fTab = useAppStore(state => state.fTab)

    const renderContent = () => {
        switch (fTab) {
            case FOOTER_TABS.NOTES:
                return <CurrencyCalculator />
            case FOOTER_TABS.TOTAL:
                return <CollectionTotals />
        
            default:
                return <NamesList />
        }
    }
    return (
        <main>
            {renderContent()}
        </main>
    )
}

const AppLayout = () => {
    return (
        <>
            <Header />
            <MainContent />
            <Footer />
        </>
    )
}

export default AppLayout