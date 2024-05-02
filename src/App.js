import Fetch from './components/Fetch'
import Detail from './components/Detail'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
function App (){
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" element ={<Fetch/>}/>
          <Route path="/Detail" element ={<Detail/>}/>
        </Routes>
      </Router>
      
    </div>
  )
}
export default App;