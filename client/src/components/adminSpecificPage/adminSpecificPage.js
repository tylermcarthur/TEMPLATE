import React from 'react'
import emailjs from 'emailjs-com';
import axios from 'axios'

class AdminSpeceficPage extends React.Component{
    constructor(props){
        super(props)   
        this.state = {
            loggedInUserRole: this.props.loggedInUserRole,
            loggedInUserGoogleData:this.props.loggedInUserGoogleData,
            socket : this.props.socket
        }

        this.startEvent = this.startEvent.bind(this)
    }
    
    addUser(event){ //function that handles sending emails to users
        event.preventDefault();
        let input1 = document.querySelector('#addUserFormInput');
        let input2 = document.querySelector('#addRoleFormInput');
        let email = input1.value;
        let role = input2.value;
        input1.value = "";
        input2.value = "";
        window.alert(`${email} has been sent a confirmation link.`)
        axios.get(`http://localhost:8000/api/users/${email}/${role}`)
        emailjs.send("service_c02xz3j","template_j3hykjj",{to_name:email},"user_l5iqJQOFtkuJlrm5bzM8J")
    } //Kolby

    startEvent(event){
        event.preventDefault();
        if(!this.props.currentEvent.ongoing){
            let time = 50;
            this.props.currentEvent.ongoing = true;
            this.state.socket.emit('startEvent', time)
        }
    }

    render(){
        return(
        <div className='adminSpecificPage-container'>
            <form id='addUserForm' onSubmit={this.addUser}>
                <span id='addUserTitle   '>Add New User: </span>
                <input id='addUserFormInput' type="text" placeholder='Enter Email...'></input>
                <span id='addUserRoleTitle'>Decide their role: </span>
                <input id='addRoleFormInput' type="text" placeholder='Admin, Staff, or Student'></input>
                <input className='adminPageButton' type="submit"></input>
            </form>
            <form id='startEventForm' onSubmit={this.startEvent}>
                {!this.props.currentEvent.ongoing && <span>Start Event:  </span>}
                {!this.props.currentEvent.ongoing && <input className='adminPageButton' type="submit" value='Start'></input>}
                {this.props.currentEvent.ongoing && <span> Event Ongoing </span>}
            </form>
        </div>
        )
    }
}
export default AdminSpeceficPage
