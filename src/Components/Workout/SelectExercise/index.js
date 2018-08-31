import React from 'react';

import { Carousel, Button } from 'antd-mobile';
import './SelectExercise.css';

  class SelectExercise extends React.Component {
    state = {
    imgHeight: 500,
    current_exercise: 0,
    index: 0,
  }

  componentWillMount() {
    console.log()
  }
  selectExercise = () => {
    this.props.onSelect(this.props.listExercise.exercises[this.state.index].exercise[this.state.current_exercise])
  }

  render() {
    console.log("From Select Exercise page");
    console.log(this.props.listExercise)
    console.log(this.state.currentItem)

    if(this.props.listExercise){
      return (
        <div className="container">
          <Carousel className="space-carousel"
            frameOverflow="visible"
            cellSpacing={10}
            slideWidth={1}
            autoplay={false}
            infinite
            afterChange={index => this.setState({current_exercise: index}) }
          >

          { this.props.listExercise.exercises[this.state.index].exercise.map( (data, key) => (
            <div className="image-with-description" key={key}>
              <div className="excercise-header" style={{ height:'25px',background:'black', color:'white', textAlign: "center"}}>{data.name}</div>
              <img
                key = { data.value }
                src={require(`../../../Assets/Workout/images/${key}.jpeg`)}
                alt={data.description}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto', description: data.description });
                }}
              />
            </div>
          ))}
          </Carousel>
          <div className="select-button">

            <Button type="default" onClick={() => this.selectExercise()}>Select</Button>
            <Button type="primary" onClick={() => (this.props.onSelect(this.state.currentItem))}>Select</Button>
          </div>
          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select>
        </div>
      );
    }else{
      return(
        <div> Just a moment ....</div>
      )
    }
  }
  // { this.props.excerciseArray.map( (data, key) => (
  //   <div className="image-with-description" key={key}>
  //     <div className="excercise-header" style={{ height:'25px',background:'black', color:'white', textAlign: "center"}}>{data.description}</div>
  //     <img
  //       key = { data.value }
  //       src={data.imgurl}
  //       alt={data.description}
  //       onLoad={() => {
  //         // fire window resize event to change height
  //         window.dispatchEvent(new Event('resize'));
  //         this.setState({ imgHeight: 'auto', description: data.description });
  //       }}
  //     />
  //   </div>
  // ))}

  }//end class
export default SelectExercise;
