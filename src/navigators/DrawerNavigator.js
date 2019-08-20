import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import Drawer from '../views/Drawer';
import HomeNavigator from './HomeNavigator';


const drawerNavigator = createDrawerNavigator(
  {
    homeNavigator: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerLockMode: 'locked-closed'
      }
    }
  },
  {
    contentComponent: props => <Drawer {...props} />
  }
);

export default createAppContainer(drawerNavigator);
