import firebase from 'firebase';
import {registratieLan} from  '../models/RegistratieLan'


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
        firebase.database().ref('registratie/' + registratie.code).set(registratie);
    }
}

export const firebaseService = new FirebaseService();