import React, {createRef} from 'react';   // need to discuss
import Card from "./components/id-card/card";
import './App.css';

class App extends React.Component {
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
    this.myInput = React.createRef();      
  }
  componentDidMount() {
    const node = this.myInput.current;  // need to discuss
    console.log(node)
  }
  handleRandomClick = () =>{
    fetch('https://api.randomuser.me/')
    .then(data=> data.json())
    .then(response=>{
      console.log(response.results[0])
      let {name, email, dob, phone, nat : nationality, picture : image} = response.results[0];
      name = name['first'] + " " + name['last'];
      dob = (new Date(dob['date'])).toLocaleDateString(); // need to discuss......
      image = image['large'];
      this.setState({ email, dob, image, nationality, phone})
    })
  }
  
  handleThemeClick = (theme) => {
    const card = document.body.getElementsByClassName("id-card")[0];   // need to discuss
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
    const type = e.currentTarget.name;  //need to discuss
    switch(type){
      case 'name': this.setState({name: e.currentTarget.value});
      break;
      case 'email': this.setState({email: e.currentTarget.value})
      break;
      case 'dob': this.setState({dob: e.currentTarget.value})
      break;
      case 'phone': this.setState({phone: e.currentTarget.value})
      break;
      case 'nationality': this.setState({nationality: e.currentTarget.value})
      break;
    }
  }
  handleKeyChange = e =>{
    if(e.key == "Enter"){
      switch(e.currentTarget.name){
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
        ref={this.myInput}
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
        onClick={(type)=>this.handleClick(type)} 
        onChange={(e)=>this.handleChange(e)}
        onKeyChange={(e)=>this.handleKeyChange(e)}
      />
      <div className="df">
        {this.state.themeColor.map(theme=>(<div className="box m-2 circle" style={{backgroundColor: theme}} onClick={()=>this.handleThemeClick(theme)}></div>))}
      </div>
      <div>
        <button className="btn" onClick={this.handleRandomClick}>Random</button>
      </div>
      </div>
    );
  }
}

export default App;
