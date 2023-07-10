import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from "./components/Header/Header"
import Form from './components/Form/Form';

function App() {

  const {onToggleButton, tg} = useTelegram();

  useEffect(() => {
    tg.ready();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  

  return (
    <div className="App">
      <Header/>
      <Form/>
      
    </div>
  );
}

export default App;
