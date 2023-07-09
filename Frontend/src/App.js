import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './Components/LandgingPage'
import Detail from './Components/Detail'
import { ProductProvider } from './Helper/Context'
import AllBooks from './Components/AllBooks'

function App() {
  return (
    <div className="App">
      <ProductProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} >
              <Route index element={<AllBooks />} />
              <Route path="/detail" element={<Detail />} />
            </Route>
          </Routes>
        </Router>
      </ProductProvider>
    </div>
  )
}

export default App
