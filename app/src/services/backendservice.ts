import { person } from '@/models/Person';
//import Router from '@/router';
//import { team } from '@/models/Team';
import axios from 'axios'
//import VueAxios from 'vue-axios'



export class BackendService {
    private host:string = "http://192.168.10.115";

    constructor() {

    }

    // saveRegistratie(person: person) {
        
    //     Router.replace('profile')
    // }

    // updateRegistratie(person: person) {

    // }

    // saveTeam(team: team) {

    // }

    // login(email: string, password: string) {

    // }

    // signup(person: person, password: string) {

    // }

    // isLoggedIn(): Promise<boolean> {

    // }

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