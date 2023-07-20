import { createStore } from 'redux';
import app from './common/reducers';

const configureStore = () => {
  const store = createStore(app);
  return store;
};

export default configureStore;
