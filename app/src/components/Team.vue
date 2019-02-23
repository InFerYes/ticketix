<template>
    <div>
        <el-row>
            <el-col :span="12">
                <h1>Your team</h1>
                    <h3>This is what we have on record:</h3>
                    <el-form label-width="200px">
                        <el-form-item label="Team name">
                            <el-input v-model="team.name" :disabled="!leader"></el-input>
                        </el-form-item>
                        <el-form-item v-if="leader" label="Invite new member">
                            <el-input placeholder="Email address" v-model="email"></el-input>
                        </el-form-item>
                        <el-form-item label="Members" v-if="invites.length>0">
                            <ul id="members">
                                <li v-for="member in team.members" :key="member.Id">
                                    <el-tooltip class="item" effect="dark" content="Remove" placement="top">
                                        <i class="el-icon-close" v-if="leader"></i>
                                    </el-tooltip>
                                    &nbsp;{{ member.nickname }}
                                </li>
                            </ul>
                        </el-form-item>
                    </el-form>
                    <el-button
                            style="margin-top: 12px;"
                            type="primary"
                            @click="updateTeam">
                                save
                    </el-button>
            </el-col>
            <el-col :span="12">
                <h1>Open invitations</h1>
                <el-form>
                    <el-form-item v-if="invites.length>0">
                        <ul id="members">
                            <li v-for="invite in invites" :key="invite.Id">
                                <el-tooltip class="item" effect="dark" content="Remove" placement="top">
                                    <i class="el-icon-close" v-on:click="declineTeamInvitation(invite.id)"></i>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="Accept" placement="top">
                                    <i class="el-icon-check" v-on:click="acceptTeamInvitation(invite.id)"></i>
                                </el-tooltip>
                                &nbsp;{{ invite.name }}
                            </li>
                        </ul>
                    </el-form-item>
                    <div v-else>No invites.</div>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { teaminvitation } from "../models/TeamInvitation";
import { team } from "../models/Team";
import { Component, Prop, Vue } from "vue-property-decorator";
import { backendService } from '@/services/backendservice';

@Component
export default class TeamView extends Vue {
    team: team = new team();
    email: string = "";
    leader: boolean = false;
    invites: teaminvitation[] = <teaminvitation[]>[];

    constructor() {
        super();
        this.setView();
        
    }

    setView() {
        this.checkLeader();
        this.getTeam();
        this.getInvitations();
    }

    updateTeam() {
        backendService.updateTeam(this.team);
    }

    checkLeader() {
         backendService.getPersonalDetails().then((person) => {
            if (person.id === this.team.idleader) {
                this.leader = true;
            }
            else {
                this.leader = false;
            }
        });
    }

    getInvitations(){
        this.invites = <teaminvitation[]>[];
        backendService.getTeamInvitations().then((response) => {
            this.invites = response;
        })
    }

    getTeam(){
        backendService.getTeam().then((response) => {
            this.$set(this.team, 'members', []);
            this.team = response;
            backendService.getTeamMembers().then((members) => {
                this.$set(this.team, 'members', members);
            })
        });
    }

    declineTeamInvitation(idteam:number){
        backendService.declineTeamInvitation(idteam).then(() => {
            this.setView();
        })
    }

    acceptTeamInvitation(idteam:number) {
        backendService.acceptTeamInvitation(idteam).then(() => {
            this.setView();
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul { 
    list-style-type: none;
    padding-left:0;
}
.el-icon-close {
    color:red;
    cursor:pointer;
}
.el-icon-check {
    color:green;
    cursor:pointer;
}
</style>