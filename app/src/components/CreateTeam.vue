<template>
<div>
  <h1>Create team</h1>
  <h2>hello</h2>
  <el-button
      style="margin-top: 12px;"
      type="primary"
      @click="updateTeam"
    >save</el-button>
</div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { firebaseService } from "@/services/firebaseservice";
import { team } from "@/models/Team";
import { person } from '@/models/Person';

@Component
export default class CreateTeam extends Vue {
  constructor() {
    super();
  }

  updateTeam() {
    let t = new team();
    t.name = "test";
    t.leader = firebaseService.currentUid;
    t.members.push(firebaseService.currentUid);
    //t.members.push(firebaseService.currentUser);
    firebaseService.saveTeam(t);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>