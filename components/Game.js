import React from 'react';
import Tip from './Tip.js';
import {View, Text, TextInput, Image, Button} from 'react-native';


let anterior = false;
let siguiente = false;

export default class Game extends React.Component{
    render(){
        console.log(this.props.image);
        if(this.props.currentQuestion === 0){
            anterior = true;
        }else {
            anterior = false;
        }
        if(this.props.currentQuestion === 9){
            siguiente = true;
        }else{
            siguiente = false;
        }
        return (
            <View>
                <View>
                    <Text>{this.props.question.question}: {}</Text>
                    <TextInput style={{borderColor: 'black', borderBottomWidth: 1}}
                               onChangeText = { e =>{
                        this.props.onQuestionAnswer(e);
                    }}
                               value={this.props.question.userAnswer || ''}
                    />

                    <Text>Tips:</Text>
                    {this.props.tips.map((tip) =>
                        <Tip key={tip} tip={tip}/>
                    )}
                </View>

                <Image style = {{width: 50, height: 50}}
                       source={{uri: this.props.image}} />

                <View>
                    <View>
                        <View>
                            <Button title = "Anterior" disabled={anterior} onPress={()=>{
                                this.props.onChangeQuestion(-1);
                            }}/>
                            <Button title="Siguiente" disabled={siguiente} onPress={() =>{
                                this.props.onChangeQuestion(1);
                            }}/>
                        </View>
                        <Button title = "Submit" onPress={()=>{
                            this.props.submit();
                        }}/>
                    </View>
                </View>
            </View>
        );
    }
}