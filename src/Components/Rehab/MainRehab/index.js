import React from 'react';
import ContainedExercises from './containedExercise';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ClanderIcon from '@material-ui/icons/HelpOutlineOutlined';
import ContentIcon from '@material-ui/icons/AssessmentOutlined';
import TrainingIcon from '@material-ui/icons/FitnessCenterOutlined';
import MainComponent from '../../HOC';
import MidComponent from '../../HOC/MidPart';

const FooterContent = [
  { label: 'Home', to: '/mainmenu', Icon: <HomeIcon /> },
  { label: 'Information', to: '/mainmenu', Icon: <ClanderIcon /> },
  { label: 'Content', to: '/mainmenu', Icon: <ContentIcon /> },
  { label: 'Training', to: '/rehab', Icon: <TrainingIcon /> },
]

const tapBarContent = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat','Sun'];

class MainRehab extends React.Component {
  constructor(props){
    super(props);
    this.state={
      value: 0,
      midPartTabsValue: 0,  
    };
    this.midPartTabsValueHandleChange=this.midPartTabsValueHandleChange.bind(this);
    this.clickHandle=this.clickHandle.bind(this);
  }
  midPartTabsValueHandleChange (event, value)  {
    this.setState({ midPartTabsValue: value });
  };

  clickHandle (exid) {
    this.props.fetchRehabPreviousRecord(this.props.RehabReducersid,exid);
  }

  render() {
    return (
      <MainComponent
        backgroundImage='image/sampleImage.jpeg'
        title='Rehab'
        FooterContent={FooterContent}
        showBottomButton
        FooterButtonClick = {this.props.onStartRehab}
        midComponent={
          <div >
            <MidComponent
              midPartTabsValue={this.state.midPartTabsValue}
              handleChange={this.midPartTabsValueHandleChange}
              tapBarContent={tapBarContent}
              currentProcess={new Date().getDay() === 0 ? 6 : new Date().getDay()}
              fetchRehabPreviousRecord={this.clickHandle}
            />
            <ContainedExercises rehab={this.props.rehab} onChange={this.props.onChange} />
          </div>
        }
      />
    )
  }
}

export default MainRehab;