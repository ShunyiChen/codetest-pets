import React,{Component} from "react";
import axios from 'axios';

 //Generate HTML dynamically
 export const generateHtml = (dest)=>{
  console.log('**************Start generating HTML:');
   let _html = '';
   for(let i=0,l=dest.length;i<l;i++){
      let _gender = '<p>' + dest[i].gender + '</p>';
      let _name = findName(dest[i].data);
      _html += `<li>${_gender}<ul>${_name}</ul></li>`;
   } 
   _html = '<ul>' + _html + '</ul>'
   console.log(_html);
   return _html;
}

//Group by people gender
export const groupByGender = (data)=>{
  let map = {}, dest = [];
  for(let i = 0; i < data.length; i++){
    let ai = data[i];
    if(!map[ai.gender]){
        dest.push({
            gender: ai.gender,
            data: [ai]
        });
        map[ai.gender] = ai;
    }else{
        for(let j = 0; j < dest.length; j++){
            let dj = dest[j];
            if(dj.gender === ai.gender){
                dj.data.push(ai);
                break;
            }
        }
    }
  }
  return dest;
}

//Find people name
export const findName=(arr)=> {
  let _name = '';
  for(let i=0,l=arr.length;i<l;i++){
    let _pets = findPets(arr[i].pets);
    _name += `<li><p>${arr[i].name}</p><ul>${_pets}</ul></li>`;
  }
 return _name;
}


//Find pets and their name and type
export const findPets = (arr)=>{
  if(!arr && typeof(arr)!=="undefined" && arr!==0) {
    return '';
  } else {
    let _name = '';
    arr.forEach(function(value,index,array){
      if(value.type === "Cat") {
        _name += `<li><p>${value.name}(${value.type})</p></li>`;
      }
    });
    return _name;
  }
}

export default class PetList extends Component{
  constructor(props){
    super(props);
    this.state={
      _html:'',
      isLoaded:false
    }
  }

  //Component did mount
  componentDidMount = ()=>{
    const _this=this;
    axios.get('http://5c92dbfae7b1a00014078e61.mockapi.io/owners').then(res=>{
     console.log('**************Before the grouping:');
     console.log(res.data);

     console.log('**************After the grouping:');
     let dest = groupByGender(res.data);
     console.log(dest);

     let content = generateHtml(dest);
     _this.setState({
        _html:content,
        isLoaded:true
     });

    }).catch(function (error) {
      console.log(error);
      _this.setState({
        isLoaded:false,
        error:error
      })
      alert('Couldn\'t connect to the API due to a network error ...');
    });
  }

  render() {
    if(!this.state.isLoaded){
      return (<div>Loading</div>)
    } else{
      return(
        <div dangerouslySetInnerHTML={{ __html: this.state._html }}></div>
      )
    }
  }

}
