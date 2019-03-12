import React, {Component} from 'react';
import './App.css';
import AppHeader from "./App/AppHeader";
import AppContent from "./App/AppContent";
import AppFooter from "./App/AppFooter";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:  null,
            games: [],
            hasFetched: false,
            loginForm: false,
        }
    }

    registerUser(user) {
        // TODO: register a user and login
		fetch('http://localhost:9999/auth/signup', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(user)
		})
		.then(response => response.json())
		//.then(body =>console.log(body))
		.then(body =>{
			if(body.errors){
				body.errors.forEach(error =>{
					console.log(error)
				});
			}
			else{
			//Add new user to system
				localStorage.setItem('username', body.username);
				localStorage.setItem('userId', body.userId);
				this.setState({
					user: body.username
				});
			}
		})
    }

    loginUser(user) {
        // TODO: login a user and set sessionStorage items username and token
		
		fetch('http://localhost:9999/auth/signin', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(user)
		})
		.then(response => response.json())
		//.then(body =>console.log(body))
		.then(body =>{
			if(body.errors){
				body.errors.forEach(error =>{
					console.log(error)
				});
			}
			else{
			//Add new user to system
				localStorage.setItem('username', body.username);
				localStorage.setItem('userId', body.userId);
				this.setState({
					user: body.username
				});
			}
		})
    }

    logout(event) {
       // TODO: prevent the default state
       // TODO: delete the data from the sessionStorage
       // TODO: update the state (user: null)
	    localStorage.removeItem('username');
		localStorage.removeItem('userId');
		this.setState({
			user: null
		});
	   
	   
	   
    }
	

    componentWillMount() {
        // TODO: check if there is a logged in user using the sessionStorage (if so, update the state, otherwise set the user to null)
			const localUserName = localStorage.getItem('username');
			if(localUserName){
				this.setState({
					user: localUserName
				});
			}
       // TODO: fetch all the games
	   this.fetchGames();
    }

    createGame(data) {
        // TODO: create a game using fetch with a post method then fetch all the games and update the state 
		
		fetch('http://localhost:9999/feed/game/create', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		//.then(body =>console.log(body))
		.then(body =>{
			if(body.errors){
				body.errors.forEach(error =>{
					console.log(error)
				});
			}
			else{
			//Add new game to system
				this.fetchGames();
			}
		})
    }
	
	fetchGames(){
		fetch('http://localhost:9999/feed/games')
		.then(rowData => rawData.json())
		.then(body => this.setState({
			games: body.games
			})
		)
	
	}
    switchForm() {
        // TODO: switch the value of the loginForm property
		this.setState({
					loginForm: !this.state.loginForm
				});
    }

    render() {
        return (
            <main>
                <AppHeader
                    user={this.state.user}
                    logout={this.logout.bind(this)}
                    switchForm={this.switchForm.bind(this)}
                    loginForm={this.state.loginForm}
                />
                <AppContent
                    registerUser={this.registerUser.bind(this)}
                    loginUser={this.loginUser.bind(this)}
                    games={this.state.games}
                    createGame={this.createGame.bind(this)}
                    user={this.state.user}
                    loginForm={this.state.loginForm}
                />
                <AppFooter/>
            </main>
        )
    }
}

export default App;


