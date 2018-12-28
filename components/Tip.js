import React from 'react';
import {View, Text} from 'react-native';

export default class Game extends React.Component{
    render(){
    	return(
            <View><Text>{this.props.tip}{"\n"}</Text></View>
    	)

    }

}