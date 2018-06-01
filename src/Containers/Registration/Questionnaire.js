import React, { Component } from 'react';
import CurrentStep  from '../../Components/Registration/Questionnaire/Progress';
import StepOne from '../../Components/Registration/Questionnaire/StepOne';
import StepTwo from '../../Components/Registration/Questionnaire/StepTwo';
import StepThree from '../../Components/Registration/Questionnaire/StepThree';

import { Progress, Pagination, List, Picker } from 'antd-mobile';
import './Questionnaire.css';

class Questionnaire extends Component {
  constructor(props){
    super(props);
    this.state = {
      detail: {
        name:"",
        age:"",
        gender: "Male",
        currentBodyWeight: 0,
      },
      program: {
        days: 2,
        trainingGoal: {}
      },
      injuryManagement: [],
      stressAndProductivity: [],
      healthAndWellbeing: [],
      generalActivity: [],
      currentPage: 1,
      hasError: false,
      value: '',
      weightArray: [
        {value: 1, label: '1 KG'},{value: 2, label: '2 KG'},{value: 3, label: '3 KG'},{value: 4, label: '4 KG'},{value: 5, label: '5 KG'},{value: 6, label: '6 KG'},
        {value: 7, label: '7 KG'},{value: 8, label: '8 KG'},{value: 8, label: '8 KG'},
      ],
      stressArray: [
        {value: 1, label: 'Stress free'},{value: 2, label: 'Minimally stressed'},{value: 3, label: 'Moderately stressed'},{value: 4, label: 'Highly stressed'},{value: 5, label: 'Extrembly stressed'},
      ],
      productivityArray: [
        {value: 1, label: 'Not productive at all'},{value: 2, label: 'Minimally productive'},{value: 3, label: 'Moderately productive'},{value: 4, label: 'Highly productive'},{value: 5, label: 'Extrembly produvtive'},
      ],
      injuryArray: [
        {value: 1, label: 'No pain'},{value: 2, label: 'Rarely in pain'},{value: 3, label: 'Sometimes in pain'},{value: 4, label: 'Regularly in pain'},{value: 5, label: 'Always in pain'},
      ],
      healthArray: [
        {value: 1, label: 'Poor'},{value: 2, label: 'Fairly good'},{value: 3, label: 'Good'},{value: 4, label: 'Excellent'},
      ],
      activityArray: [
        {value: 1, label: 'Sendentary'},{value: 2, label: 'Lightly active'},{value: 3, label: 'Moderately active'},{value: 4, label: 'Very active'},{value: 5, label: 'Extrembly active'},
      ],
      exerciseArray: [
        {value: 1, label: 'Sendentary'},{value: 2, label: 'Lightly active'},{value: 3, label: 'Moderately active'},{value: 4, label: 'Very active'},{value: 5, label: 'Extrembly active'},
      ],

    }
  }

onChange = (value) => {
  console.log("value",value);
}

  nextButtonHandler = () => {
    console.log("Next button clicked");
  }
  previousButtonHandler = () => {
    console.log("previouse button clicked");
  }

  detailHandler = () => {
    console.log("DetailHander");
  }
  plusHandler = () =>{
    let program = this.state.program;
    program['days'] = program['days'] + 1;
    this.setState({ program: program })
  }
  minusHandler = () =>{
    let program = this.state.program;
    if(program['days']>1){
      program['days'] = program['days'] - 1;
      this.setState({ program: program })
    }
  }

  //handle to radio button for gender selection
  genderHandler = (value) => {
    console.log('checkbox',value);
    let detail = {...this.state.detail}
    detail['gender'] = value;
    this.setState({
      detail
    });
    console.log(this.state.detail);
  };

//handle the input filed for stepOne
inputItemHandler = (step, assignTo, data) => {
    //step refers to the six different steps
    //assign refers to particular data such as name or age.
    //data is the data being entered in input field
    if( step === 'one'){
      let detail = {...this.state.detail}
      detail[assignTo] = data;
      this.setState({ detail: detail})
    }
  }
  //handle the value for weight picker
  onWeightPicker = (weight) => {
    let detail = {...this.state.detail}
    detail['currentBodyWeight'] = weight[0];
    this.setState({detail})
    this.setState({ weightPicker: weight[0]})
  }
  //handle the pagination onChange event
  onPaginationHandler = (currentPage) => {
    this.setState({ currentPage })
  }

  render() {
    const percent  = (this.state.currentPage-1)*20;
    const radioData = [
      { value: "Male", label: 'Male' },
      { value: "Female", label: 'Female' },
      { value: "Others", label: 'Others' },
    ];
    const data = [
       { value: 0, label: 'Muscle size and strength', description:"Weight training principles designed to build muscle and strength" },
       { value: 1, label: 'fat loss/Definition', description: "A combination of cardio and weight training to target fat loss and increase muscle definition "},
       { value: 2, label: 'Decrease stress', description:"Using exercise strategies to reduce stress levels and restore balance back in your body"},
       { value: 3, label: 'Improve posture', description:"Utilising specific exercises and weight training to correct postural imbalances "}
     ];

    let RenderPage = null;
    if(this.state.currentPage === 1){
      RenderPage = (
        <StepOne
           change={this.inputItemHandler}
           detail={this.state.detail}
           radioData={radioData}
           weightArray={this.state.weightArray}
           selectWeight={this.onWeightPicker}
           radioHandler = {this.genderHandler}
        />
      );
    } else if(this.state.currentPage === 2){
      RenderPage = (
        <StepTwo
         plus={this.plusHandler}
         minus={this.minusHandler}
         days={this.state.program.days}
         change={() => this.onChange()}
         data={data}
        />
      );
    } else if(this.state.currentPage === 3){
      RenderPage = (
        <StepThree
         change={this.onChange}
        />
      );
    }else if(this.state.currentPage === 4){
      RenderPage = (
        <div>
          <h2>Stress and Productivity</h2>
          <br/><br/>

          <p>How often do you feel stressed at work?</p>
          <Picker
            data={this.state.stressArray}
            cols={1}
            value={[this.state.detail.currentBodyWeight]}
            onOk={v => this.onWeightPicker(v)}
            >
            <List.Item arrow="horizontal">Stress:</List.Item>
          </Picker>
          <br/><br/>

          <p>How productive do you feel each day?</p>
          <Picker
            data={this.state.productivityArray}
            cols={1}
            value={[this.state.detail.currentBodyWeight]}
            onOk={v => this.onWeightPicker(v)}
            >
            <List.Item arrow="horizontal">Productivity:</List.Item>
          </Picker>

        </div>
      );
    } else if(this.state.currentPage === 5){
      RenderPage = (
        <div>
          <h2>Health and Wellbeing</h2>
          <br/><br/>

          <p>Do you experience injury or posture related pain at work?</p>
          <Picker
            data={this.state.injuryArray}
            cols={1}
            value={[this.state.detail.currentBodyWeight]}
            onOk={v => this.onWeightPicker(v)}
            >
            <List.Item arrow="horizontal">Injury:</List.Item>
          </Picker>
          <br/><br/>

          <p>How do you feel your health and wellbeing right now?</p>
          <Picker
            data={this.state.healthArray}
            cols={1}
            value={[this.state.detail.currentBodyWeight]}
            onOk={v => this.onWeightPicker(v)}
            >
            <List.Item arrow="horizontal">Health:</List.Item>
          </Picker>

        </div>
      );
    }else if(this.state.currentPage === 6){
      RenderPage = (
        <div>
          <h2>General Activity and Exercise Level</h2>
          <br/><br/>

          <p>How active are you on a daily basis?</p>
          <Picker
            data={this.state.activityArray}
            cols={1}
            value={[this.state.detail.currentBodyWeight]}
            onOk={v => this.onWeightPicker(v)}
            >
            <List.Item arrow="horizontal">Injury:</List.Item>
          </Picker>
          <br/><br/>

          <p>What is your current exercise activity level?</p>
          <Picker
            data={this.state.exerciseArray}
            cols={1}
            value={[this.state.detail.currentBodyWeight]}
            onOk={v => this.onWeightPicker(v)}
            >
            <List.Item arrow="horizontal">Health:</List.Item>
          </Picker>

        </div>
      );
    }

    //for pagination
    const locale = {
      prevText: 'Prev',
      nextText: 'Next',
    };
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
        <div className="pagination-container">
            <Pagination total={6} current={this.state.currentPage} onChange={p => this.onPaginationHandler(p)} locale={locale}  />
         </div>
      </div>

    )
  }
}
export default Questionnaire;
