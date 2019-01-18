import firebase from 'firebase';
import {registratieLan} from  '../models/RegistratieLan'
import Router from '../router';


export class FirebaseService{
    config = {
        apiKey: "AIzaSyBQsjv52fgK0XSr6rxseqyNLPLgja-MlZo",
        authDomain: "ticketix-e991f.firebaseapp.com",
        databaseURL: "https://ticketix-e991f.firebaseio.com",
        projectId: "ticketix-e991f",
        storageBucket: "ticketix-e991f.appspot.com",
        messagingSenderId: "612195648739"
      };

    constructor() {
        firebase.initializeApp(this.config);

    }
    saveRegistratie(registratie:registratieLan){
        firebase.database().ref('registration/' + registratie.registerCode).set(registratie);
    }
    login (email:string, password:string) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            (user) => {
                Router.replace('profile')
            },
            (err) => {
              alert('Oops. ' + err.message)
            }
        );
    }
    signup(email:string,password:string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            (user) => {
                Router.replace('login')
            },
            (err) => {
              alert('Oops. ' + err.message)
            }
        );
    }
    logout() {
        firebase.auth().signOut().then(
            () => {
            Router.replace('login')
            }
        );
    }
}
export const firebaseService = new FirebaseService();