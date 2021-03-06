import React from 'react';
import {NavBar, Icon, Badge} from 'antd-mobile';
import RehabProgress from './RehabProgress';
import RehabCues from './RehabCues';
import RecordList from './RecordList';
import './RehabExercise.css';

const RehabExercise = (props) => {
  return(
    <div className="exercise">
          {/* navigation bar on top of screen*/}
        <NavBar
           style={{backgroundColor:"white"}}
           mode='light'
           icon={<Icon type="left" size="lg"/>}
           onLeftClick={(e) => props.back(e)}
           className="nav-bar">
           <div className="nav-bar-text">
           {props.state.rehabName}
            {/* props.state.exerciseData.workout */} { /* props.state.exerciseIndex+ 1}/{props.state.exerciseLength */}
           </div>
        </NavBar>
        <div className="image-block">

          {/* circle bar on top right of screen*/}
          <div className="prescription-circle">
            <Badge text={
              <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', height: '50px', width: '40px', marginTop: '-25px' }}>
              <span style={{ height: '13px', marginTop: '-3px' }}>{props.state.sets}X</span>
              <span style={{ height: '13px' }}>{props.state.reps}</span>
              </div>}
              style={{ height: '50px', width: '40px', backgroundColor: '#1BC390', borderRadius: '50%' }}
            />
          </div>
           {/* the main gif/image area */}
           <img src={require("../../../Assets/Workout/Exercise/exerciseGif.gif")} className="exercise-image" alt="exercise"/>
         </div>

         {/* Exercise Cues Here */}
         <RehabCues/>

         {/* reps group Here */}
         <RecordList
          state = {props.state}
          next = {props.next}
          complete = {props.complete}
         />

         {/* Progress  Here */}
         <RehabProgress/>

      </div>
  )
}

export default RehabExercise;
