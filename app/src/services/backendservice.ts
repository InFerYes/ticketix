import { person } from '@/models/Person';
import Router from '@/router';
import { team } from '@/models/Team';
import axios from 'axios';
import { account } from "../models/Account";
// import { messageService } from './messageService';
// import { message } from '../models/Message'
import { checklogin } from '@/models/CheckLogin';
import { registration } from '../models/Registration';

export class BackendService {
    private host: string = "http://192.168.10.115";
    public loggedin: boolean= false;

    constructor() {
        this.isLoggedIn().then((response) => {
            this.loggedin = response;
        })
    }
    // saveRegistratie(person: person) {

    //     Router.replace('profile')
    // }

    // updateRegistratie(person: person) {

    // }

    login(acc: account) {
        axios.post(this.host + "/api/account/login.php", JSON.stringify(acc)).then(
            (ret) => {
                console.log(localStorage.getItem("sess"));
                axios.defaults.withCredentials = true;
                Router.replace('profile');
                this.loggedin = true;
            },
            (err) => {
                alert('Oops. ' + err.message);
            });
    }

    logout() {
        // axios.defaults.headers.post['PHPSESSID'] =  ;
        axios.post(this.host + "/api/account/logout.php").then(
            () => {
                axios.defaults.withCredentials = false;
                Router.replace('login');
                this.loggedin = false;
            },
            (err) => {
                alert('Oops. ' + err.message);
            });
    }

    signup(person: person, password: string) {
        let acc = new account();
        acc.email = person.email;
        acc.password = password;
        let registration: registration = <registration>{};
        registration.account = acc;
        registration.person = person;
        axios.post(this.host + "/api/account/register.php", JSON.stringify(registration)).then(
            () => {
                Router.replace('login');
            },
            (err) => {
                alert('Oops. ' + err.message);
        });
    }

    isLoggedIn(): Promise<boolean> {
        return axios.post(this.host + "/api/account/checklogin.php")
            .then(
                (value: any) => {
                    let cl: checklogin = value.data;
                    return cl.isLoggedIn;
                })
            .catch(
                (value: any) => {
                    let cl: checklogin = value.response.data;
                    return cl.isLoggedIn;
                })
                .finally(() => {
                    
                });
    }

    // get currentUid(): string {
    //     return "";
    // }

    // get currentUser(): person {
    //     return this.user;
    // }

    getPersonalDetails(): Promise<person> {
        return axios.get(this.host + "/api/person/read_one.php").then((response) => {
            return response.data;
        });
    }

    getTeam(): Promise<team> {
        return axios.get(this.host + "/api/team/read_one.php").then((response) => {
            return response.data;
        });
    }

    getTeamMembers() {
        return axios.get(this.host + "/api/person/getteammembers.php").then((response) => {
            return response.data;
        });
    }

    updateTeam(team: team) {
        axios.post(this.host + "/api/team/update.php", JSON.stringify(team)).then(
            () => {
                Router.replace('teamview');
            },
            (err) => {
                alert('Oops. ' + err.message);
        });
    }

    // getPersonalDetails2(): Promise<any> {

    // }

    // getTeamDetails(): Promise<team> {

    // }

    // getPersonByUid(uid: string): Promise<person> {

    // }


}
export const backendService = new BackendService();