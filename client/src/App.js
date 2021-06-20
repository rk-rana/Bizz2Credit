import './App.css';
import Register from '../src/components/register'
import addSubUser from './components/addSubUser'
import Login from '../src/components/login'
import Home from '../src/components/home'
import editSubUser from '../src/components/editSubUser'

import { BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      

        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/Home" component = {Home}/>
        <Route exact path="/addSubUser" component = {addSubUser} />
        <Route exact path="/editSubUser" component = {editSubUser}/> 
        
    
    </Router>
    

  );
}

export default App;
