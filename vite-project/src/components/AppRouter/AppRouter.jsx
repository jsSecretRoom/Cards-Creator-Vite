import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../../App';
import FirstPage from '../FirstPage/FirstPage';
import CollectionPage from '../CollectionPage/CollectionPage'; // Импортируйте созданный ранее компонент CollectionPage

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/firstpage" element={<FirstPage />} />
        <Route path="/Cards-Creator/:collectionName" component={CollectionPage} />
      </Switch>
    </Router>
  );
}

export default AppRouter;