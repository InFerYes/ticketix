<template>
<div>
  <h1>Your team</h1>
  <h3>This is what we have on record:</h3>
  <el-form label-width="100px">
      <el-form-item label="Team name">
        <el-input v-model="team.name"></el-input>
      </el-form-item>
    </el-form>
  <el-button
      style="margin-top: 12px;"
      type="primary"
      @click="updateTeam"
    >save</el-button>
</div>

</template>

<script lang="ts">
import { team } from "../models/Team";
import { Component, Prop, Vue } from "vue-property-decorator";
import { backendService } from '@/services/backendservice';

@Component
export default class TeamView extends Vue {
  team: team = new team();

  constructor() {
    super();
    this.getTeam();
  }

  updateTeam() {
    backendService.updateTeam(this.team);
  }

  getTeam(){
    backendService.getTeam().then((response) => {
      this.team = response;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>