import React from 'react';
import { Root } from 'native-base';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducers from './src/redux/reducers';
import DrawerNavigator from './src/navigators/DrawerNavigator';

console.disableYellowBox = true;

class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(Reducers)}>
        <Root>
          <DrawerNavigator />
        </Root>
      </Provider>
    );
  }
}

export default App;
