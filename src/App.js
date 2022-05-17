import './scss/app.scss';
import List from './List';

const App = ()=> {
  return (
    <div className="App">
    <nav>
    <span className="capital">H</span>acker<span className="capital">N</span>ews
    </nav>
    <List/>
    
    </div>
  );
}

export default App;
