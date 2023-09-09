import './App.scss'

import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './firestoreComponen/auth';

import Form from './components/Form/Form';
import ShovButton from './components/ShovButton/ShovButton';
import CardVisible from './components/CardVisible/CardVisible';
import FirstPage from './components/FirstPage/FirstPage';
import CollectionPage from './components/CollectionPage/CollectionPage';
import ConnectidIndicator from './components/IndicatorsComponents/ConnectidIndicator';


function App() {

  return (
    <div className='app-conteiner'>
      <main>
        <section className='form-section'>
          <div className='side-conteiner'>
            <section className='authUsers'>
              <AuthProvider />
            </section>
            <div className='create-block'>
              <ShovButton />
              <Form /> 
            </div>
          </div>
        </section>
        <section className='pages-section'>
          <ConnectidIndicator/>
          <div className='pages-block'>
            <Routes>
              <Route path="/" element={<FirstPage />} />
              <Route path="/createcard" element={<CardVisible />} />
              <Route path="/collections/:collectionName" element={<CollectionPage />} />
            </Routes>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;