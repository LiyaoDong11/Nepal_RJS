// @flow
import React, { Component } from 'react';
import { Progress, Button} from 'antd-mobile';
import { connect } from 'react-redux';
import { addName, addAge, addGender, addWeight, addExercisePlace,
  addDays, addGoals,
  addRehabFocus, addStress,
  addProductivity, addProductiveAfterExercise,
  addWorkInjury, addHealthFeeling,
  addDailyActivity, addCurrentActivity,
  stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix
}from './actions';
import {bindActionCreators} from 'redux';

import CurrentStep  from '../../Components/Questionnaire/Progress';
import StepOne from '../../Components/Questionnaire/StepOne';
import StepTwo from '../../Components/Questionnaire/StepTwo';
import StepThree from '../../Components/Questionnaire/StepThree';
import StepFour from '../../Components/Questionnaire/StepFour';
import StepFive from '../../Components/Questionnaire/StepFive';
import StepSix from '../../Components/Questionnaire/StepSix';

import './Questionnaire.css';

const removeArrayItem = (arr, itemToRemove) => {
  return arr.filter(item => item !== itemToRemove)
}

class Questionnaire extends Component {
  constructor(props){
    super(props);
    this.state = {
      trainingGoals: [
        { value: 0, isChecked: false, label: 'Muscle size and strength', description:"Weight training principles designed to build muscle and strength" },
        { value: 1, isChecked: false, label: 'Fat Loss/Definition', description: "A combination of cardio and weight training to target fat loss and increase muscle definition "},
        { value: 2, isChecked: false, label: 'Decrease stress', description:"Using exercise strategies to reduce stress levels and restore balance back in your body"},
        { value: 3, isChecked: false, label: 'Improve posture', description:"Utilising specific exercises and weight training to correct postural imbalances "}
      ],
      trainingGoalsForHome: [
        { value: 0, isChecked: false, label: 'Fat Loss/Definition', description: "A combination of cardio and weight training to target fat loss and increase muscle definition "},
        { value: 1, isChecked: false, label: 'Decrease stress', description:"Using exercise strategies to reduce stress levels and restore balance back in your body"},
        { value: 2, isChecked: false, label: 'Fitness', description:"xxxxxxxxxx xxxxxxxx xxxxxx xxxxx "}
      ],
      injuryManagement: [
        { value: 0, isChecked: false, description: 'Posture Correction', imgurl: 'http://livebiomechanix.com/wp-content/uploads/2015/12/Screen-shot-2015-11-30-at-7.49.40-PM-596x191.png'},
        { value: 1, isChecked: false, description: 'Lower Back Pain', imgurl: 'http://totalphysiocare.com.au/wp-content/uploads/2017/05/lower-back-pain-relief.png'},
        { value: 2, isChecked: false, description: 'Neck Pain', imgurl: 'https://static.wixstatic.com/media/b1546b_f6a11249f1a346e08fc817d7cece04c3~mv2.jpg/v1/fill/w_630,h_382,al_c,lg_1,q_80/b1546b_f6a11249f1a346e08fc817d7cece04c3~mv2.webp'},
        { value: 3, isChecked: false, description: 'Shoulder Pain', imgurl: 'https://feelpainrelief.com/wp-content/uploads/2015/09/shoulder-pain-300x200.jpg'},
        { value: 4, isChecked: false, description: 'Hip Pain', imgurl: 'https://qph.fs.quoracdn.net/main-qimg-4d054f876feaa4b3d4944914a6f7cb66-c'},
      ],
      currentPage: 1,
      hasError: false,
    }//state ends
    // this.makeNextToFinish=this.makeNextToFinish.bind(this);
  }//constructor ends

  componentWillReceiveProps(nextProps) {
    const {goals, rehab_focus} = this.props.QuestionnaireReducers.fields;
    const trainingGoals = [ ...this.state.trainingGoals ];
    const injuryManagement = [ ...this.state.injuryManagement];
    goals.map(i => {
      trainingGoals[i].isChecked = true;
      return null;
    })
    rehab_focus.map(j => {
      injuryManagement[j].isChecked = true;
      return null;
    })
    this.setState({ trainingGoals, injuryManagement })
  }
  //handle the checkbox for injury management in questionnaire (third page)
  injuryManagementCheckboxHandler = (value) => {
    let injuryManagement = [ ...this.state.injuryManagement];
    let tempRehabFocus = [];
    let count = 0;
    injuryManagement.map(i =>{
      if(i.isChecked === true){
        count ++;
        tempRehabFocus.push(i.value);
      }
      return null;
    })
    if(count < 2 || injuryManagement[value].isChecked){
      injuryManagement[value].isChecked = !injuryManagement[value].isChecked;
      if(tempRehabFocus.includes(value)){
        tempRehabFocus = removeArrayItem(tempRehabFocus, value)
      }else{
        tempRehabFocus.push(value);
      }
      this.props.addRehabFocus(tempRehabFocus);
      this.setState({ injuryManagement });
    }
    else{
      alert('Exceeded maximun number of selection');
    }
  }
  //handle the checkbox for program in questionnaire (second page)
  programCheckboxHandler = (value) => {
    const {exercisePlace} = this.props.QuestionnaireReducers.fields;
    let tempGoals = [];
    let trainingGoals = exercisePlace === 'home'? [ ...this.state.trainingGoalsForHome ] : [ ...this.state.trainingGoals ];
    let count = 0;
    trainingGoals.map(i => {
      if(i.isChecked === true) {
        tempGoals.push(i.value);
        count ++;
      }
      return null;
    })
    if(count < 2 || trainingGoals[value].isChecked) {
      trainingGoals[value].isChecked = !trainingGoals[value].isChecked;
      if(tempGoals.includes(value)){
        tempGoals = removeArrayItem(tempGoals, value)
      }else{
        tempGoals.push(value);
      }
      this.props.addGoals(tempGoals);
      this.setState({ trainingGoals });
    } else {
      alert('You can select only two at most');
    }
  }
  increaseCurrentPage = (currentPage) => {
    currentPage += 1;
    this.setState({ currentPage })
  }
  buttonHandler = (button) =>{
    let currentPage = this.state.currentPage;
    if(button === "previous"){
      if(currentPage>1){
        currentPage -= 1;
        this.setState({ currentPage })
      }
    }
    if(button === "next"){

      if(currentPage === 1 ){
        let {nick_name} = this.props.QuestionnaireReducers
        let {age, gender, weight, exercisePlace} = this.props.QuestionnaireReducers.fields;
        if(age === "" || gender === "" || weight === "" || nick_name === "" || exercisePlace === ""){
          alert("please insert all the data to proceed to next step");
          return;
        }
        this.props.stepOne(nick_name, age, gender, weight, exercisePlace);
        this.increaseCurrentPage(currentPage);

      }else if(currentPage === 2) {
        let {days_per_week, goals} = this.props.QuestionnaireReducers.fields;
        if(goals.length===0){
          alert("please insert all the data to proceed to next step");
          return;
        }
        this.props.stepTwo(days_per_week, goals);
        this.increaseCurrentPage(currentPage);

      }else if(currentPage === 3) {
        let {rehab_focus} = this.props.QuestionnaireReducers.fields;
        if( rehab_focus.length === 0){
          alert("Please insert all the data to proceed to next step");
          return;
        }
        this.props.stepThree(rehab_focus);
        this.increaseCurrentPage(currentPage);

      }else if(currentPage === 4) {
        let {stress, productivity} = this.props.QuestionnaireReducers.fields;
        if( stress == "" || productivity === ""){
          alert("Please insert all the data to proceed to next step");
          return;
        }
        this.props.stepFour(stress, productivity);
        this.increaseCurrentPage(currentPage);

      }else if(currentPage === 5) {
        let {work_injury, health_feeling} = this.props.QuestionnaireReducers.fields;
        if( work_injury === "" || health_feeling === ""){
          alert("Please insert all the data to proceed to next step");
          return;
        }
        this.props.stepFive(work_injury, health_feeling);
        this.increaseCurrentPage(currentPage);

      }else if(currentPage === 6) {
        let {current_activity, daily_activity} = this.props.QuestionnaireReducers.fields;
        if( current_activity === "" || daily_activity === "" ){
          alert("Please insert all the data to proceed to next step");
          return;
        }
        this.props.stepSix(current_activity, daily_activity);
        alert("Finish questionnaire");
      }
    }
  }
  render() {
    console.log("Component state",this.props.QuestionnaireReducers)
    const {nick_name, fields} = this.props.QuestionnaireReducers;
    const percent  = (this.state.currentPage-1)*17;
    const genderArray = [
      { value: "male", label: 'Male' },
      { value: "female", label: 'Female' },
      { value: "others", label: 'Others' },
    ];
    const daysArray= [
      {value: 3, label: '3'},{value: 4, label: '4'},{value: 5, label: '5'},
    ];
    const weightArray= [
      {value: 70, label: '70 KG'},{value: 71, label: '71 KG'},{value: 72, label: '72 KG'},{value: 73, label: '73 KG'},{value: 74, label: '74 KG'},{value: 75, label: '75 KG'},
      {value: 76, label: '76 KG'},{value: 77, label: '77 KG'},{value: 78, label: '78 KG'},{value: 79, label: '79 KG'},{value: 80, label: '80 KG'},
    ];
    const exercisePlaceArray = [
      { value: "gym", label: 'Gym' },
      { value: "home", label: 'Home' },
    ];
    const stressArray= [
      {value: '1', label: 'Stress free', description:'I never feel stressed'},{value: '2', label: 'Minimally stressed', description:'I rarely feel stressed'},
      {value: '3', label: 'Moderately stressed', description:'I feel stressed occasionally'},{value:'4', label: 'Highly stressed', description:'I feel quite stressed most days'},
      {value: '5', label: 'Extrembly stressed', description:'I feel highly stressed every day'},
    ];
    const productivityArray = [
      {value: '1', label: 'Not productive at all', description:'I never feel productive'},{value: '2', label: 'Minimally productive', description:'I don’t feel productive very often'},
      {value: '3', label: 'Moderately productive', description:'I feel fairly productive most days'},{value: '4', label: 'Highly productive', description:'I feel highly productive most days'},
      {value: '5', label: 'Extrembly productive', description:'I feel highly productive every day'},
    ];
    const injuryArray = [
      {value: '1', label: 'No pain', description:'I never feel injury or posture related pain'},{value: '2', label: 'Rarely in pain', description:'I feel injury or posture related pain every few weeks or months'},
      {value: '3', label: 'Sometimes in pain', description:'I feel injury or posture related pain 1-2 times a week'},{value: '4', label: 'Regularly in pain', description:'I feel injury or posture related pain most days of the week'},
      {value: '5', label: 'Always in pain', description:'I feel consistent injury or posture related pain every day of the week'},
    ];
    const healthArray = [
      {value: '1', label: 'Poor', description:'I feel like my health and wellbeing is poor right now'},{value: '2', label: 'Fairly good', description:'I feel like my health and wellbeing is fairly good right now'},
      {value: '3', label: 'Good', description:'I feel like my health and wellbeing is very good right now'},{value: '4', label: 'Excellent', description:'I feel like my health and wellbeing are excellent right now'},
    ];
    const activityArray= [
      {value: '1', label: 'Sendentary', description:'I am sitting all day'},{value: '2', label: 'Lightly active', description:'Most of my day is sitting but I walk and stand for short periods of the day'},
      {value: '3', label: 'Moderately active', description:'I am walking and standing for most of the day'},{value: '4', label: 'Very active', description:'I am walking or standing all day long'},
      {value: '5', label: 'Extrembly active', description:'I do heavy lifting/labour type work or highly intense activity nearly all of the day'},
    ];
    const exerciseArray= [
      {value: '1', label: 'Sendentary', description:'I do no exercise '},{value: '2', label: 'Lightly active', description:'I do some light cardio or weight training 1-2 times a week'},
      {value: '3', label: 'Moderately active', description:'I do cardio or weight training 3-4 times a week'},{value: '4', label: 'Very active', description:'I do cardio or weight training 5-6 times a week'},
      {value: '5', label: 'Extrembly active', description:'I do intense cardio or weight training 6+ times a week'},
    ];
    let RenderPage = null;
    if(this.state.currentPage === 1){
      RenderPage = (
        <StepOne
        fields={fields}
        name={nick_name}
        nameHandler={this.props.addName}
        ageHandler={this.props.addAge}
        genderArray={genderArray}
        genderHandler = {this.props.addGender}
        weightArray={weightArray}
        selectWeight={this.props.addWeight}
        exercisePlaceArray={exercisePlaceArray}
        selectExercisePlace={this.props.addExercisePlace}
        />
      );
    } else if(this.state.currentPage === 2){
      RenderPage = (
        <StepTwo
        daysArray = {daysArray}
        days= {fields.days_per_week}
        selectDays = {this.props.addDays}
        change={this.programCheckboxHandler}
        data = { fields.exercisePlace ==='home' ? this.state.trainingGoalsForHome : this.state.trainingGoals }
        />
      );
    } else if(this.state.currentPage === 3){
      RenderPage = (
        <StepThree
        change={this.injuryManagementCheckboxHandler}
        data = {this.state.injuryManagement}
        />
      );
    }else if(this.state.currentPage === 4){
      RenderPage = (
        <StepFour
        stressArray={stressArray}
        selectStress={this.props.addStress}
        fields = {fields}
        productivityArray={productivityArray}
        selectProductivity={this.props.addProductivity}
        />
      );
    } else if(this.state.currentPage === 5){
      RenderPage = (
        <StepFive
        injuryArray={injuryArray}
        selectInjury={this.props.addWorkInjury}
        fields = {fields}
        healthArray={healthArray}
        selectHealth={this.props.addHealthFeeling}
        />
      );
    }else if(this.state.currentPage === 6){
      RenderPage = (
        <StepSix
        activityArray={activityArray}
        selectActivity={this.props.addDailyActivity}
        fields = {fields}
        exerciseArray={exerciseArray}
        selectExercise={this.props.addCurrentActivity}
        />
      );
    }
    return(
      <div className="container">
      <div className= "content-without-pagination">
      <div className="progress-bar">
      <div className="progress"><Progress percent={percent} position="normal" /></div>
      <div aria-hidden="true">{percent}%</div>
      </div>
      <CurrentStep currentPage={this.state.currentPage}/>
      {RenderPage}
      </div>
      <div className="pagination-container" style ={{textAlign: 'center'}}>
      <Button type="primary" disabled={this.state.currentPage === 1 ? true: false}  onClick={() => this.buttonHandler('previous')}
      inline size="medium" style={{ float: 'left'}}>
      previous
      </Button>
      <span id="footer_page" style ={{}}>{this.state.currentPage}/6</span>
      <Button type="primary" onClick={() => this.buttonHandler('next')}
      inline size="medium" style={{ float: 'right'}}>
      {this.state.currentPage === 6 ? "Finish": "Next"}
      </Button>
      </div>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    QuestionnaireReducers: state.QuestionnaireReducers
  }
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({
    addName, addAge, addGender, addWeight, addExercisePlace,
    addDays, addGoals,
    addRehabFocus, addStress,
    addProductivity, addProductiveAfterExercise,
    addWorkInjury, addHealthFeeling,
    addDailyActivity, addCurrentActivity,
    stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix
  }, dispatch
);
}
export default connect (mapStateToProps, matchDispatchToProps)(Questionnaire);
