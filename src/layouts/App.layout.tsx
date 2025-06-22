import Footer from "../components/Footer.component"
import Header from "../components/Header.component"
import { FOOTER_TABS } from "../constants"
import CurrencyCalculator from "../components/CurrencyCalculator.component"
import useAppStore from "../store/app.store"
import NamesList from "../components/NamesList.component"

const MainContent = () => {
    const fTab = useAppStore(state => state.fTab)

    const renderContent = () => {
        switch (fTab) {
            case FOOTER_TABS.NAMES:
                return <NamesList />
            case FOOTER_TABS.TOTAL:
                return <>Total</>
        
            default:
                return <CurrencyCalculator />
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