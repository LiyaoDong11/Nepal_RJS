import React ,{Component} from 'react'
import {Tabs} from 'antd-mobile'
import Content from './Content'
import Hoc from '../../../../HOC/Hoc';
import Header from '../Header';
import Footer from '../../../../Containers/Workout/FooterContainer';
import { connect } from 'react-redux';


class HistoryWeekly extends Component {

  state = {
    currentPage: 0
  }
  componentDidUpdate(prevProps) {
    if(prevProps.currentPage !== this.props.currentPage){
      this.setState({
        currentPage: this.props.currentPage
      })
    }
  }
  render(){
    console.log(this.props.HistoryReducers)
    console.log(this.props.WorkoutReducers)
    let programID = parseInt((this.props.match.params.programID),10)
    let days;
    if(this.props.HistoryReducers.program){
       days = this.props.HistoryReducers.program.days;
    }
    let {history} = this.props.HistoryReducers
    let historyData = history.find((j) => programID === parseInt((j.program_id),10))
    console.log(historyData)
  return (
    <Hoc>
      <Header/>
      {historyData.daily_record ?
        <div className='plan-tabs'>
          <Tabs
            page={this.state.currentPage}
            tabs={[...Array(5)].map((v, k) => ({ title: 'WEEK ' + (k+1) }))}
            renderTabBar={
              props => <Tabs.DefaultTabBar {...props} page={3} />
              }
            onTabClick={(tab,index) => {console.log(index+1) ||  this.setState({currentPage: index})}}
            swipeable={false}
          >
              <div className='content'>
              <Content
                selectedWeek={this.state.currentPage}
                days={days}
                programID={programID}
                onParticularDayClicked={this.props.onParticularDayClicked}/>
              </div>
            </Tabs>
        </div>
        :
        <div style={{textAlign:'center'}}>No History Avaiable in This Program</div>
      }
      <Footer />
    </Hoc>
   );
  }
}

function mapStateToProps(state){
  return {
    HistoryReducers: state.HistoryReducers,
    WorkoutReducers: state.WorkoutReducers
  }
}

// const currentWeek = (progress, days) => (Math.ceil(progress / days));
export default connect(mapStateToProps,null)(HistoryWeekly);
