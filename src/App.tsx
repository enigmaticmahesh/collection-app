// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Home from './pages/Home.page'
import NotesSubscriber from './components/NotesSubscriber.component'
import Alert from './components/Alert.component'
import './App.css'

function App() {

  return (
    <>
      <NotesSubscriber />
      <Alert />
      <Home />
    </>
  )
}

export default App
