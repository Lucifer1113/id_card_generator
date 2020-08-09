import React, {Component} from 'react';   
import Card from "./components/id-card/card";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Sergio Fontai',
      email:'sergio.fontai@example.com',
      dob: '04/07/1995',
      phone: '076 282 62 56',
      nationality:'INDIAN',
      image: "",
      idCardNumber: "ID0001",
      showInputName: false,
      showInputEmail: false,
      showInputDob: false,
      showInputPhone: false,
      showInputNationality: false,
      themeColor: ['#14213d', '#3c2c3e', '#004D40', "#3E2723", "#212121", "#263238"]
    }
          
  }
  
  handleRandomClick = () =>{
    fetch('https://api.randomuser.me/')
    .then(data=> data.json())
    .then(response=>{
      console.log(response.results[0])
      let {name, email, dob, phone, nat : nationality, picture : image} = response.results[0];
      name = name['first'] + " " + name['last'];
      dob = (new Date(dob['date'])).toLocaleDateString(); 
      image = image['large'];
      this.setState({ name, email, dob, image, nationality, phone})
    })
    .catch(err=>alert(err))
  }
  
  handleThemeClick = (theme) => {
    const card = document.getElementsByClassName("id-card")[0];   
    card.style.backgroundColor = theme;
  }
  handleClick = (type) => {
    switch(type){
      case 'name': this.setState({showInputName: true});
      break;
      case 'email': this.setState({showInputEmail: true});
      break;
      case 'phone': this.setState({showInputPhone: true});
      break;
      case 'nationality': this.setState({showInputNationality: true});
      break;
      case 'dob': this.setState({showInputDob: true});
      break;
    }
  }
  handleChange = e =>{
    const type = e.target.name;  
    switch(type){
      case 'name': this.setState({name: e.target.value});
      break;
      case 'email': this.setState({email: e.target.value})
      break;
      case 'dob': this.setState({dob: e.target.value})
      break;
      case 'phone': this.setState({phone: e.target.value})
      break;
      case 'nationality': this.setState({nationality: e.target.value})
      break;
    }
  }
  handleKeyChange = e =>{
    if(e.key === "Enter"){
      switch(e.target.name){
        case 'name': this.setState({showInputName: false});
        break;
        case 'email': this.setState({showInputEmail: false});
        break;
        case 'dob': this.setState({showInputDob: false});
        break;
        case 'phone': this.setState({showInputPhone: false});
        break;
        case 'nationality': this.setState({showInputNationality: false});
        break;
      }
    }
  }
  render(){
    const {name, email, dob, phone, image, nationality, showInputName, showInputEmail, showInputDob, showInputPhone, showInputNationality, idCardNumber} = this.state;
    return (
      <div className="App">
        <h1>ID CARD GENERATOR</h1>

        <Card 
        name={name} 
        email={email} 
        dob={dob} 
        phone={phone} 
        nationality={nationality} 
        showInputName={showInputName} 
        showInputEmail = {showInputEmail}
        showInputDob = {showInputDob}
        showInputPhone = {showInputPhone}
        image={image}
        idCardNumber={idCardNumber}
        showInputNationality = {showInputNationality}
        showInputTag={(type)=>this.handleClick(type)} 
        changedInputValue={(e)=>this.handleChange(e)}
        onKeyChange={(e)=>this.handleKeyChange(e)}
      />
      <div className="df">
        {this.state.themeColor.map(theme=>(<div className="box m-2 circle" style={{backgroundColor: theme}} onClick={()=>this.handleThemeClick(theme)}></div>))}
      </div>
        <button className="btn" onClick={this.handleRandomClick}>Random</button>
      </div>
    );
  }
}

export default App;
