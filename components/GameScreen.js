import React from 'react';

import { connect } from 'react-redux';
import Game from "./Game";

import Chronometer from "./Chronometer"
import {questionAnswer} from "../reducers/actions";
import {changeQuestion} from "../reducers/actions";
import {submit} from "../reducers/actions";
import {initQuestions} from "../reducers/actions";

import {View, Text, Button, Image} from 'react-native';

let url = "https://quiz2019.herokuapp.com/api/quizzes/random10wa?token=32f3456e3e8df146f85c";
let comment = "You have finished the game!"

class GameScreen extends React.Component {
    componentDidMount(){
        fetch(url)
            .then((res)=> res.json())
            .then(data =>{
                return this.props.dispatch(initQuestions(data));
            })
    }

    render() {
        if(this.props.questions.length === 0){
            return (<Text>Loading...</Text>)
        }
        if (this.props.finished === false) {
            return (
                <View style={{flex:1, margin: 10, justifyContent:'center'}}>
                    <Text> Question {this.props.currentQuestion +1 } </Text>
                    <View>
                        <Game question={this.props.questions[this.props.currentQuestion]}
                              image={this.props.questions[this.props.currentQuestion].attachment.url}
                              tips={this.props.questions[this.props.currentQuestion].tips}
                              onQuestionAnswer ={(answer) => {
                                  this.props.dispatch(questionAnswer(this.props.currentQuestion, answer))
                              }}
                              onChangeQuestion={(a) => {
                                  this.props.dispatch(changeQuestion(this.props.currentQuestion + a))
                              }}
                              score={this.props.score}
                              submit={() => {
                                  this.props.dispatch(submit(this.props.questions))
                              }}
                              currentQuestion = {this.props.currentQuestion}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <View>
                        <Text>{comment}{"\n"}
                        Final score: {this.props.score}
                        </Text>
                    </View>

                    <Button title="Try again!" onPress={()=>{
                        this.props.dispatch(initQuestions(this.props.questions))
                    }}/>
                    <Button title="Reset" onPress={()=>{
                        this.componentDidMount();
                        //this.props.dispatch(initQuestions(this.props.questions))
                        //window.location.reload(true);
                    }}/>
                </View>
            );
        }
    }
}
function mapStateToProps(state){ //Con esta función recibimos el estado de Redux y lo tenemos en forma de props
    return {
        ...state
    }
}
export default connect(mapStateToProps)(GameScreen);

/* ESTO IBA EN LA LINEA 53, entre los </VIEW>
<View>
    <Chronometer  submit = {()=>{
        comment = "You run out of time"
        this.props.dispatch(submit(this.props.questions))
    }}/>
</View>
*/
