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

    user!: person;

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
        //TODO: if key is not empty, update, else push
        let ref = firebase.database().ref('team/').push(team);
        let key = ref.key;
        this.getPersonalDetails().then(function(p) {
            p.tid = key;
            firebase.database().ref('person/' + p.uid).update(p);
        });
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

    get currentUid(): string {
        return firebase.auth().currentUser.uid;
    }

    get currentUser(): person {
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
            return Promise.reject(new person());
        }
    }

    getPersonalDetails2(): Promise<any> {
        let user: any;
        user = firebase.auth().currentUser;
        if (user != null) {
            return firebase.database().ref('person/')
            .orderByChild('tid')
                        .equalTo('-LWhCMCT4XXdu4ka41kK')
            .once('value').then((value) => {
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
            return Promise.reject(new person());
        }
    }

    getTeamDetails(): Promise<team> {
        let retval: team = new team();
        let user: any;
        let tempteam: team;
        user = firebase.auth().currentUser;
        if (user != null) {
            return firebase.database()
                .ref('team/')
                .orderByChild('leader')
                .equalTo(user.uid)
                .once('value')
                .then((returnteam) => {
                    tempteam = returnteam.val()[Object.keys(returnteam.val())[0]];
                        return firebase.database()
                        .ref('person/')
                        .orderByChild('tid')
                        .equalTo(Object.keys(returnteam.val())[0])
                        .once('value')
                        .then((teammembers) => {
                                if (teammembers.val() == null)
                                {
                                    console.log("nope");
                                }
                                else {
                                    console.log("members");
                                    console.log(teammembers);
                                    //tempteam.members2 = teammembers.val();
                                    return tempteam;
                                }
                                
                            })
                });
        }
        else {
            return Promise.reject(new team()); //not authed
        }
    }

    getPersonByUid(uid: string): Promise<person> {
        let user: any;
        user = firebase.auth().currentUser;
        if (user != null) {
            return firebase.database().ref('person/' + uid).once('value').then((value) => {
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
            return Promise.reject(new person()); // not authed
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