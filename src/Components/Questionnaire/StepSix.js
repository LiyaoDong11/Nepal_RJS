import React from 'react';
import { Modal, Checkbox,Flex} from 'antd-mobile';
import ShowNoticeBar from './NoticeBar';
import './Questionnaire.css';
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
const showAlert = (i, props) => {
  alert(i.label, i.description, [
    { text: 'Go back', style: 'default' },
    { text: 'Select', onPress: () => props(i.value) },
  ]);
}
const StepSix = (props) => {
  return(
    <div>
      <div className="noticebar">
        <ShowNoticeBar />
      </div>
      <h2 style={{textAlign: 'center'}}>General Activity and Exercise Level</h2>
      <div className="listHeader"> How active are you on a daily basis?</div>

      {props.activityArray.map((i,key) => (
        <Flex key={key}>
          <Flex.Item>
        <CheckboxItem key={key} checked={props.fields.daily_activity === i.value} onChange={() => props.selectActivity(i.value)}>
          <span onClick= {() => showAlert(i, props.selectActivity)}>
          {i.label}
          </span>
        </CheckboxItem>
        </Flex.Item>
        </Flex>
      ))}
    <div className="listHeader">How many days per week do you currently exercise?</div>

    {props.exerciseArray.map((i,key) => (
      <Flex key={key}>
        <Flex.Item>
      <CheckboxItem key={key} checked={props.fields.current_activity === i.value} onChange={() => props.selectExercise(i.value)}>
        <div onClick= {() => showAlert(i, props.selectExercise)}>
          {i.label}
        </div>
      </CheckboxItem>
      </Flex.Item>
      </Flex>
    ))}
  </div>
  )
}

export default StepSix;
