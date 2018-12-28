import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


import ReduxProvider from './reducers/ReduxProvider';

export default class App extends React.Component {
    render(){
        return(
            <ReduxProvider/>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

