import firebase from 'firebase';
import { person } from '@/models/Person';
import Router from '@/router';
import { team } from '@/models/Team';


export class FirebaseService {
    config = {
        apiKey: "AIzaSyBQsjv52fgK0XSr6rxseqyNLPLgja-MlZo",
        authDomain: "ticketix-e991f.firebaseapp.com",
        databaseURL: "https://ticketix-e991f.firebaseio.com",
        projectId: "ticketix-e991f",
        storageBucket: "ticketix-e991f.appspot.com",
        messagingSenderId: "612195648739"
    };

    user!: person;;

    constructor() {
        firebase.initializeApp(this.config);

    }
    saveRegistratie(person: person) {
        firebase.database().ref('person/' + person.uid).set(person);
        Router.replace('profile')
    }

    updateRegistratie(person: person) {
        person.uid = firebase.auth().currentUser.uid || "9999somethinggotfucked9999"; //auth doesn't exist, save it anyway
        firebase.database().ref('person/' + person.uid).update(person).catch(() => {
            console.log("caught");
            this.saveRegistratie(person);
        });
    }

    saveTeam(team: team) {
        let ref = firebase.database().ref('team/').push(team);
        let key = ref.key; //POC
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
    isLoggedIn(): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            if (firebase.auth().currentUser != null) {
                resolve(true);
                
            }
            else {
                reject(false);
            }
         });
         return promise;
    }

    get currentUid():string {
        return firebase.auth().currentUser.uid;
    }

    get currentUser():person {
        return this.user;
    }

    getPersonalDetails(): Promise<person> {
        let user: any;
        user = firebase.auth().currentUser;
        if (user != null) {
            return firebase.database().ref('person/' + user.uid).once('value').then((value) => { 
                if (value.val() == null) {
                    let p = new person();
                    p.firstName = "Oops, you don't seem to exist.";
                    p.lastName = "At least not in our records.";
                    p.nickName = "Please edit these values and hit save.";
                    p.email = user.email;
                    
                    this.user = p;
                    return p;
                    
                }
                else {
                    this.user = value.val();
                    return value.val();
                }
            });
        }
        else {
            return Promise.resolve(new person());
        }
    }

    //Werkend voorbeeld van continuous (live) ophalen van data
    // getPersonalDetails2(): person {
    //     let user: any;
    //     let retval: person = <person>{};

    //     // firebase.database().ref('posts/' + postId + '/starCount');
    //     //     starCountRef.on('value', function(snapshot) {
    //     //     updateStarCount(postElement, snapshot.val());
    //     //     });

    //     user = firebase.auth().currentUser;
    //     let fb = firebase.database().ref('person/' + user.uid);
    //     fb.on('value', (snapshot) => {
    //         if (snapshot != null)
    //         retval = snapshot.val();
    //     });
    //     return retval;
    // }


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