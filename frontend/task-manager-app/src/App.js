import './App.css';
import ViewPage from './component/ViewPage';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import BoardView from './component/BoardView';
import ListView from './component/ListView';
import CalendarView from './component/CalendarView';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/' element={<ViewPage view={<ListView/>} index={1}/>} />
      <Route path='/ListView' element={<ViewPage view={<ListView/>} index={1}/>} />
      <Route path='/Board' element={<ViewPage index={3} view={<BoardView/>}/>} />
      <Route path='/Calendar' element={<ViewPage index={2} view={<CalendarView/>}/>} />
      </Routes>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
