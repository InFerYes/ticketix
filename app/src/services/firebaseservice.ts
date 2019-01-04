import firebase from 'firebase';
//import { SaveGebruikerData } from '../models/SaveGebruikerData';


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
    /*saveDateGebruiker(data:SaveGebruikerData){
        firebase.database().ref('Gebruikers/' + data.PersoonGegevens.idkaart).set(data);
    }*/
}

export const firebaseService = new FirebaseService();