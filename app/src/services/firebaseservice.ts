import firebase from 'firebase';
import { person } from '../models/Person';
import Router from '../router';


export class FirebaseService {
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
    saveRegistratie(person: person) {
        console.log(person.uid);
        firebase.database().ref('person/' + person.uid).set(person);
        Router.replace('profile')
    }
    login(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            (user) => {
                Router.replace('profile');
            },
            (err) => {
                alert('Oops. ' + err.message)
            }
        );
    }
    signup(person: person, password: string) {
        firebase.auth().createUserWithEmailAndPassword(person.email, password).then(
            (newauth: any) => {
                person.uid = newauth.user.uid;
                this.saveRegistratie(person);
            },
            (err) => {
                alert('Oops. ' + err.message)
            }
        );
    }
    isLoggedIn(): boolean {
        let isloggedin: boolean = false;

        if (firebase.auth().currentUser != null) {
            isloggedin = true;
        };

        return isloggedin;
    }
    getPersonalDetails(): person {
        let user: any;
        let retval: person = <person>{};

        user = firebase.auth().currentUser;
        firebase.database().ref('person/' + user.uid).once('value').then((value: any) => {
            retval = <person>value.val();
        }).catch((error: any) => {
            console.log(error);
        });
        return retval;
    }

    //Werkend promise voorbeeld:
    // signup(requestor:person, password: string): Promise<string> {
    //     let promise = new Promise<string>((resolve, reject) => { });
    //     firebase.auth().createUserWithEmailAndPassword(email, password).then(
    //         (user: any) => {
    //             Router.replace('login')
    //             console.log(user);
    //             promise = Promise.resolve(user.uid);
    //         },
    //         (err) => {
    //             alert('Oops. ' + err.message)
    //             promise = Promise.resolve("");
    //         }
    //     );
    //     return promise;
    // }

    logout() {
        firebase.auth().signOut().then(
            () => {
                Router.replace('login')
            }
        );
    }
}
export const firebaseService = new FirebaseService();