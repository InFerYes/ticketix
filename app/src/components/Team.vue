<template>
  <div>
    <h1>Your team</h1>
    <h3>This is what we have on record:</h3>
    <el-form label-width="100px">
      <el-form-item label="Team name">
        <el-input v-model="team.name"></el-input>
      </el-form-item>
    </el-form>
    <ul id="members">
      <div v-for="item in team.members2" :key="item.uid">{{item.nickName}}</div>
    </ul>
    <el-button style="margin-top: 12px;" type="primary" @click="updateTeam">save</el-button>
  </div>
</template>

<script lang="ts">
import { team } from "@/models/Team";
import { teammembers } from "@/models/TeamMembers";
import { Component, Prop, Vue } from "vue-property-decorator";
import { firebaseService } from "@/services/firebaseservice";
import { person } from "@/models/Person";

@Component
export default class TeamView extends Vue {
  team: team = new team();

  constructor() {
    super();
    this.getData();
  }

  updateTeam() {
    let t = new team();
    t.name = "test";
    t.leader = firebaseService.currentUid;
    t.members.push(firebaseService.currentUid);
    firebaseService.saveTeam(t);
  }
  
  getData() {
    firebaseService.getTeamDetails().then(value => {
      this.team = value;
    });
  }

// @Component
// export default class TeamView extends Vue {
//   team: team = new team();

//   constructor() {
//     super();
//     this.getTeam();
//   }

//   updateTeam() {
//     let t = new team();
//     t.name = "test";
//     t.leader = firebaseService.currentUid;
//     t.members.push(firebaseService.currentUid);
//     firebaseService.saveTeam(t);
//   }

//   getTeam() {
//     // let t: team = <team>{};
//     // t.name = "test";
//     // t.members = <string[]>[];
//     // t.members2 = <person[]>[];
//     // t.members2.push(< person>{ nickName: "nickname", uid:"test"});
//     // t.members2.push(< person>{ nickName: "nickname2", uid:"test2"});
//     // t.members.push("test");
//     // console.log(t);
//     // console.log(this.team);
//     // this.team = t;
//     // console.log(this.team);
//     firebaseService.getTeamDetails().then(value => {
//       this.team = value;
//     });

    
//   }

//   // getTeam() {
//   //   firebaseService.getTeamDetails().then(value => {
//   //     value.members.forEach(key => {
//   //       firebaseService.getPersonByUid(key).then(value => {
//   //         this.members.members.push(value);
//   //       });
//   //     });
//   //     this.team = value;
//   //   });
//   // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>