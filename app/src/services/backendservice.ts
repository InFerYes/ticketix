import { person } from '@/models/Person';
import Router from '@/router';
//import { team } from '@/models/Team';
import axios from 'axios';
import { account } from "../models/Account";
import { messageService } from './messageService';
import { message } from '../models/Message'
import { checklogin } from '@/models/CheckLogin';


export class BackendService {
    private host: string = "http://192.168.10.115";

    constructor() {
        
    }

    // saveRegistratie(person: person) {

    //     Router.replace('profile')
    // }

    // updateRegistratie(person: person) {

    // }

    // saveTeam(team: team) {

    // }

    login(acc: account) {
        axios.post(this.host + "/api/account/login.php", JSON.stringify(acc)).then(
            () => {
                axios.defaults.withCredentials = true;
                Router.replace('profile');
            },
            (err) => {
                alert('Oops. ' + err.message);
            });
    }

    signup(person: person, password: string) {
        // axios.post(this.host + "/api/account/login.php", JSON.stringify(acc)).then(
        //     () => {
        //         Router.replace('profile');
        //     },
        //     (err) => {
        //         alert('Oops. ' + err.message);
        // });
    }

    isLoggedIn(): Promise<boolean> {
        return axios.post(this.host + "/api/account/checklogin.php")
            .then(
                (value: any) => {
                    let cl: checklogin = value.response.data;
                    return cl.isLoggedIn;
                })
            .catch(
                (value: any) => {
                    let cl: checklogin = value.response.data;
                    return cl.isLoggedIn;
                });
    }

    // get currentUid(): string {
    //     return "";
    // }

    // get currentUser(): person {
    //     return this.user;
    // }

    getPersonalDetails(): Promise<person> {
        return axios.get(this.host + "/api/person/read_one.php?id=1").then((response) => {
            return response.data;
        });
    }

    // getPersonalDetails2(): Promise<any> {

    // }

    // getTeamDetails(): Promise<team> {

    // }

    // getPersonByUid(uid: string): Promise<person> {

    // }

    // logout() {

    // }
}
export const backendService = new BackendService();