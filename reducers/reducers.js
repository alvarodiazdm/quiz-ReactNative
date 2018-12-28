import { combineReducers } from 'redux';
import { QUESTION_ANSWER } from "./actions";
import { CHANGE_QUESTION } from "./actions";
import { SUBMIT } from "./actions";
import { INIT_QUESTIONS } from "./actions";

function score(state = 0, action = {}){
    switch(action.type){
        case SUBMIT:
            state = 0;
            for(let n =0; n<action.payload.length ; n++){
                if(action.payload[n].userAnswer === undefined){
                    action.payload[n].userAnswer = "";
                }
                if(action.payload[n].answer.toLowerCase() === action.payload[n].userAnswer.toLowerCase()){
                    state++;
                }
            }
            console.log(state);
            return state;
        case INIT_QUESTIONS:
            state = 0;
            return state;
        default:
            return state;
    }
}
function finished(state = false, action={}){
    switch (action.type){
        case SUBMIT:
            state = true;
            return state;
        case INIT_QUESTIONS:
            state = false;
            return state;
        default:
            return state;
    }
}
function currentQuestion(state = 0, action={}){
    switch (action.type){
        case CHANGE_QUESTION:
            return action.payload;
        case INIT_QUESTIONS:
            state = 0;
            return state;
        default:
            return state;
    }
}
function questions(state = [], action={}){
    switch (action.type){
        case QUESTION_ANSWER:
            return state.map((question, i)=>{
                return {...question,
                            userAnswer: action.payload.index === i ?
                                        action.payload.answer : question.userAnswer}
            });
        case INIT_QUESTIONS:
            state = action.payload;
            return state;
        default:
            return state;
    }
}

const GlobalState = (combineReducers({
    score,
    finished,
    currentQuestion,
    questions
}));

export default GlobalState;
