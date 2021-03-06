import axios from 'axios';

//fetch Current rehab from the database
export function fetchRehab(){
  return(dispatch: Function) => {
    dispatch(setInitialisation(true));
    let user_id = sessionStorage.getItem('user_id');
    console.log(user_id);
    return axios.get(`https://nepal.sk8tech.io/wp-json/wp/v2/rehab_program?
                    filter[meta_key]=user_id&filter[meta_value]=${user_id}&filter[posts_per_page]=1`
    ).then((response) => {
      if(response.data.length === 0){
        dispatch(redirectToQuestionnaire(true));
      }else{
        let createdDate = new Date(response.data[0].date);
        var currentDate = new Date();
        var timeDiff = Math.abs(currentDate.getTime() - createdDate.getTime());
        var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        var today
        if(currentDate.getDay() === 0) {
          today =6;
        }else{
          today = currentDate.getDay()-1;
        }
        if((today === 0 && diffDays > 2) || (today === 1 && diffDays > 3) || (today === 2 && diffDays > 4)
            || (today === 3 && diffDays > 6) || (today === 4 && diffDays > 7) ){

              dispatch(redirectToQuestionnaire(true));
        }else{
          if(response.data[0].acf.days === today.toString()){
            dispatch(setRehabID(response.data[0].id))
            dispatch(setRehab(response.data[0].acf))
            dispatch(setInitialisation(false));
            dispatch(getRehabRecord(response.data[0].id))
          }else{
            let rehabID = response.data[0].id;
            let rehabData = response.data[0].acf;
            rehabData.days = today;
            rehabData.rehab.map((value, rehabIndex) => {
              value.data.map((value1, dataIndex) => {
                rehabData.rehab[rehabIndex].data[dataIndex].is_completed = false;
                return null;
              })
              return null;
            })
            dispatch(updateRehabProgram(rehabID, rehabData))
            dispatch(getRehabRecord(response.data[0].id))
          }
        }
      }
    }).catch((error) => {
      if(error.response){
        dispatch(catchError(error.response.data.message));
      }else{
        dispatch(catchError("Oops! Unable to connect to the server. Either your device is offline or server is down."))
      }
    })
  }
}

export function updateRehabProgram(rehabID, rehabData) {
  return(dispatch: Function) => {
    let token = sessionStorage.getItem('token');
    return axios.post(`https://nepal.sk8tech.io/wp-json/wp/v2/rehab_program/${rehabID}`,{
      status: "publish",
      fields: {
        rehab: rehabData.rehab
      }
    }, {
      headers:{ Authorization: "Bearer" + token }
    }).then((response)=> {
      console.log("updated rehab program",response)
      dispatch(setRehabID(response.data.id))
      dispatch(setRehab(response.data.acf))
      dispatch(setInitialisation(false));

    }).catch((error) => {
      dispatch(setInitialisation(false));
      console.log(error);
      console.log(error.response);
    })
  }
}

//fetch the rehab for particular type to make available to user to choose with
export function fetchRehabList(name, type){
  return(dispatch: Function) => {
    return axios.get(`https://nepal.sk8tech.io/wp-json/wp/v2/rehab?filter[meta_key]=name&filter[meta_value]=${name}`)
    .then((response) => {
      let rehabData = JSON.parse(JSON.stringify(response.data[0].acf));
      let index = rehabData.rehab_list.findIndex(i => { return i.type === type});
      let rehabList = rehabData.rehab_list[index];
      dispatch(setRehabList(rehabList));
    }).catch((error) => {
      if(error.response){
        dispatch(catchError(error.response.data.message));
      }else{
        dispatch(catchError("Oops! Unable to connect to the server. Either your device is offline or server is down."))
      }
    })
  }
}

//this function update the rehab list for the user
export function selectRehab(rehabID, rehab, selectedRehab, rehabIndex, dataIndex){
  return(dispatch : Function) => {
    dispatch(uploadingToServer(true));
    let token = sessionStorage.getItem('token');
    let rehabArray = JSON.parse(JSON.stringify(rehab));
    rehabArray[rehabIndex].data[dataIndex].name = selectedRehab.name;
    rehabArray[rehabIndex].data[dataIndex].sets = selectedRehab.sets;
    rehabArray[rehabIndex].data[dataIndex].reps = selectedRehab.reps;
    rehabArray[rehabIndex].data[dataIndex].time = selectedRehab.time;
    axios.post(`https://nepal.sk8tech.io/wp-json/wp/v2/rehab_program/${rehabID}`,
    {
      status: "publish",
      fields:{
        rehab: rehabArray
      }
    }, {
      headers:{ Authorization: "Bearer" + token }
    }).then((response) => {
        dispatch(setRehab(response.data.acf))
        dispatch(uploadingToServer(false));
    }).catch((error)=> {
      dispatch(uploadingToServer(false));
      if(error.response){
        dispatch(catchError(error.response.data.message));
      }else{
        dispatch(catchError("Oops! Unable to connect to the server. Either your device is offline or server is down."))
      }
    })
  }
}

export function createRehabRecord(rehabID, day) {
  return(dispatch: Function) => {
    let user_id = sessionStorage.getItem('user_id');
    let token = sessionStorage.getItem('token');
    return axios.post(`https://nepal.sk8tech.io/wp-json/wp/v2/rehab_record`,
      {
          status: "publish",
          fields:{
            user_id: user_id,
            rehab_program_id: rehabID,
            day: day
          }
      }, {
        headers:{ Authorization: "Bearer" + token }
      }).then((response) => {
          dispatch(setRehabRecord(response.data.acf));
          dispatch(setRehabRecordID(response.data.id));
          dispatch(isFetchingRehabRecord(false))
      }).catch((error) =>{
        console.log(error.response);
      })
  }
}
//This function is used to fetch the record for given rehabID
export function getRehabRecord(rehabID){
  return(dispatch: Function) => {
    dispatch(isFetchingRehabRecord(true));
    var day = new Date().getDay()-1;
    let user_id = sessionStorage.getItem('user_id');
    return axios.get(`https://nepal.sk8tech.io/wp-json/wp/v2/rehab_record?filter[meta_key]=rehab_program_id&filter[meta_value]=${rehabID}`)
    .then((response) => {
      if(response.data.length === 0 ){
        dispatch(createRehabRecord(rehabID, day));
      }else{
          let found = false, index;
          for(let i=0; i<response.data.length; i++){
            if(response.data[i].acf.day === day.toString()){
              found = true;
              index = i;
              break;
            }
          }
          if(found){
            dispatch(setRehabRecord(response.data[index].acf));
            dispatch(setRehabRecordID(response.data[index].id));
            dispatch(isFetchingRehabRecord(false))
          }else{
            dispatch(createRehabRecord(rehabID, day));
          }

      }
    }).catch((error)=> {
      console.log(error.response);
    })
  }
}

export function completedCurrentRehab(rehabID, rehab, rehabIndex, dataIndex){
  return(dispatch: Function) => {
    console.log("completedCurrentRehab")
    let token = sessionStorage.getItem('token');
    let rehabData = JSON.parse(JSON.stringify(rehab));
    rehabData.rehab[rehabIndex].data[dataIndex].is_completed = true;
    console.log("Updated rehab Data",rehabData)
    dispatch(updateRehabProgram(rehabID, rehabData))
  }
}

//This function use to save the record when user click on complete button
export function saveRehabRecord(rehabRecordID, record, rehabCategory, name, sets, title, data){
  return(dispatch: Function) => {
    dispatch(uploadingToServer(true));
    let token = sessionStorage.getItem('token');
    let rehab, temp, rehabRecord;
    rehabRecord = JSON.parse(JSON.stringify(record));
    if(rehabRecord.rehab){
        rehab = rehabRecord.rehab;
        let rehabIndex = rehab.findIndex( i => { return (i.rehab_category === rehabCategory) });
        if(rehabIndex >= 0){
          let dataIndex = rehab[rehabIndex].data.findIndex ( i => { return (i.name === name) });
          if(dataIndex >=0) {
            temp = {data:data}
            rehab[rehabIndex].data[dataIndex].value.push(temp);
          }else{//can not find the dataIndex
            temp = { name: name, sets:sets, repsortime: title, value:[{data: data}] }
            rehab[rehabIndex].data.push(temp);
          }
        }else{//can not find the rehabIndex
          temp = { rehab_category:rehabCategory, data: [{ name: name, sets:sets, repsortime: title, value:[{data: data}] }] }
          rehab.push(temp);
        }
    }else{
      //cannot find the rehabRecord create the new value instead
      rehab = [{ rehab_category:rehabCategory, data: [{ name: name, sets:sets, repsortime: title, value:[{data: data}] }] }]
    }
    return axios.post(`https://nepal.sk8tech.io/wp-json/wp/v2/rehab_record/${rehabRecordID}`,{
      status: "publish",
      fields: {
        rehab: rehab
      }
    }, {
      headers:{ Authorization: "Bearer" + token }
    }).then((response)=> {
      dispatch(setRehabRecord(response.data.acf));
      dispatch(uploadingToServer(false));
    }).catch((error)=> {
      console.log("Error",error);
      dispatch(uploadingToServer(false));
    })
  }
}

//This function receives the rehab data and store it in the backend
export function addRehab(rehab){
  return(dispatch: Function) =>{
    let user_id = sessionStorage.getItem('user_id');
    let token = sessionStorage.getItem('token');
    let days = new Date().getDay() - 1;
    return axios.post("https://nepal.sk8tech.io/wp-json/wp/v2/rehab_program",
    {
      status: "publish",
      fields: {
        user_id : user_id,
        days: days,
        rehab : rehab,
      }
    }, {
      headers:{ Authorization: "Bearer" + token }
    }).then((response) => {
        dispatch(redirectToQuestionnaire(false))
          dispatch(uploadingToServer(false))
    }).catch((error) => {
        dispatch(uploadingToServer(false))
        alert("got some error")
        console.log("error",error);
    })
  }
}
/*  This function collect the data for both injurymanagement and posture correction
    and send to to another function to store it in backend
*/
export function  prepareRehabData(injuryManagement, postureCorretion) {
  return(dispatch: Function) => {
    dispatch(uploadingToServer(true))
    let injuryManagementCategory;
    let postureCorrectionCategory;
    let injuryManagementJsonPath;
    let postureCorrectionJsonPath;
    let rehab =[];
    switch (injuryManagement) {
      case "1": injuryManagementCategory ="lowerbackpain"; break;
      case "2": injuryManagementCategory ="neckpain"; break;
      case "3": injuryManagementCategory ="shoulderpain"; break;
      case "4": injuryManagementCategory ="hippain"; break;
      default: injuryManagementCategory = "";
    }
    switch (postureCorretion) {
      case "1": postureCorrectionCategory = "roundedshoulder"; break;
      case "2": postureCorrectionCategory = "anteriorpelvictilt"; break;
      case "3": postureCorrectionCategory = "swayposture"; break;
      default: postureCorrectionCategory = "";
    }
    if(injuryManagementCategory !== ""){
      injuryManagementJsonPath = `./DataSources/Rehab/InjuryManagement/${injuryManagementCategory}.json`;
      return axios.get(injuryManagementJsonPath)
      .then((injuryManagementResponse) => {
        rehab.push(injuryManagementResponse.data);
        if(postureCorrectionCategory !== ""){
            //upload both postureCorrection and injuryManagement
          postureCorrectionJsonPath = `./DataSources/Rehab/PostureCorrection/${postureCorrectionCategory}.json`;
          return axios.get(postureCorrectionJsonPath)
          .then((postureCorrectionResponse) => {
            rehab.push(postureCorrectionResponse.data);
            dispatch(addRehab(rehab));
          }).catch((error)=> {
            console.log("error",error)
          })
        }else{ // for if(postureCorrectionCategory != "")
            //upload only injurymanagement part
          dispatch(addRehab(rehab));
        }
      }).catch((error) => {
        dispatch(uploadingToServer(false))
        console.log("error",error);
      })
    }else{ //for if(injuryManagementCategory !== "")
      if(postureCorrectionCategory !== ""){
        postureCorrectionJsonPath = `./DataSources/Rehab/PostureCorrection/${postureCorrectionCategory}.json`;
        if(postureCorrectionCategory !== ""){
          postureCorrectionJsonPath = `./DataSources/Rehab/PostureCorrection/${postureCorrectionCategory}.json`;
          return axios.get(postureCorrectionJsonPath)
          .then((postureCorrectionResponse) => {
            rehab.push(postureCorrectionResponse.data);
            //Upload only posture correction part
            dispatch(addRehab(rehab));
          }).catch((error)=> {
            dispatch(uploadingToServer(false))
            console.log("error",error)
          })
        }
      }
    }
  }
}

//fetching record for previous week
export function fetchRehabPreviousRecord(rehabID: Number, day: Number){
  return(dispatch: Function) => {
    console.log("this is day",day);
    dispatch(isFetchingPreviousRecord(true));
    return axios.get(`https://nepal.sk8tech.io/wp-json/wp/v2/rehab_record?
                      filter[meta_key]=rehab_program_id&filter[meta_value]=${rehabID}`
    ).then((response) => {
      let recordFound = false, index;
      for(let i=0; i<response.data.length ; i++){
        if(response.data[i].acf.day === day.toString()){
          recordFound = true;
          index = i;
          break;
        }
      }
      if(recordFound){
        dispatch(setPreviousDaysRecord(response.data[index].acf));
      }else{
        dispatch(setPreviousDaysRecord(null))
      }
      dispatch(isFetchingPreviousRecord(false));
    }).catch((error) => {
      console.log(error);
    })
  }

}

export function setRehabList(rehabList: Object){
  return {
    type : "SET_REHAB_LIST",
    payload: rehabList
  }
}

export function setRehab(rehab: Object) {
  return {
    type: "SET_REHAB",
    payload: rehab
  }
}
export function setRehabID(id: Number) {
  return {
    type: "SET_REHAB_ID",
    payload: id
  }
}
export function setRehabRecord(rehabRecord: Object) {
  return {
    type: "SET_REHAB_RECORD",
    payload: rehabRecord
  }
}
export function setRehabRecordID(id: Number) {
  return {
    type: "SET_REHAB_RECORD_ID",
    payload: id
  }
}
export function setPreviousDaysRecord(data: Object){
  console.log("setting previous week record");
  return {
    type: "SET_PREVIOUS_DAYS_RECORD",
    payload: data
  }
}
export function isFetchingPreviousRecord(value: Boolean) {
  return {
    type: "IS_FETCHING_PREVIOUS_RECORD",
    payload: value
  }
}
export function isFetchingRehabRecord(value: Boolean) {
  return {
    type: "IS_FETCHING_REHAB_RECORD",
    payload: value
  }
}
export function uploadingToServer(value : Boolean) {
  return {
    type: "UPLOADING_TO_SERVER",
    payload: value
  }
}
export function setInitialisation(value: Boolean){
  return {
    type: "SET_INITIALISATION",
    payload: value
  }
}
export function redirectToQuestionnaire(value: Boolean){
  return {
    type: "REDIRECT_TO_QUESTIONNARIE",
    payload: value
  }
}
export function catchError(error: string){
  return{
    type: "CATCH_ERROR",
    payload: error
  }
}

export function removeError(){
  return{
    type: "REMOVE_ERROR",
    payload: null
  }
}

export function addInjuryManagement (injury_management: String) {
  return {
    type: "ADD_INJURY_MANAGEMENT",
    payload: injury_management
  }
}
export function addPostureCorrection (posture_correction: String) {
  return {
    type: "ADD_POSTURE_CORRECTION",
    payload: posture_correction
  }
}
