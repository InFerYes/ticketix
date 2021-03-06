import { person } from '@/models/Person';
import Router from '@/router';
import { team } from '@/models/Team';
//import { teaminvitation } from '@/models/TeamInvitation';
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

    getPersonalDetails(): Promise<person> {
        return axios.get(this.host + "/api/person/read_one.php").then((response) => {
            return response.data;
        });
    }

    updatePersonalDetails(person: person): Promise<person> {
        return axios.post(this.host + "/api/person/update.php", JSON.stringify(person)).then((response) => {
            return response.data;
        });
    }

    getTeam(): Promise<team> {
        return axios.get(this.host + "/api/team/read_one.php").then((response) => {
            return response.data;
        });
    }

    getTeamMembers() {
        return axios.get(this.host + "/api/person/get_teammembers.php").then((response) => {
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

    getTeamInvitations(){
        return axios.get(this.host + "/api/team/get_invitations.php").then((response) => {
            return response.data;
        });
    }

    declineTeamInvitation(idteam:number){
        return axios.get(this.host + "/api/team/decline_invitation.php?idteam=" + idteam.toString()).then((response) => {
            return response.data;
        });
    }

    acceptTeamInvitation(idteam:number) {
        return axios.get(this.host + "/api/team/accept_invitation.php?idteam=" + idteam.toString()).then((response) => {
            return response.data;
        });
    }

    sendTeamInvitation(team: team) {
        axios.post(this.host + "/api/team/send_invitation.php", JSON.stringify(team));
    }

    removeTeamMember(idteam:number, idmember: number){
        return axios.get(this.host + "/api/team/remove_teammember.php?idteam=" + idteam.toString() + "&idmember=" + idmember.toString()).then((response) => {
            return response.data;
        });
    }
}
export const backendService = new BackendService();