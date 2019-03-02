<template>
  <div>
    <h1>Your profile</h1>
    <h3>This is what we have on record:</h3>
    <el-form label-width="220px">
      <el-form-item label="First name">
        <el-input v-model="person.firstname"></el-input>
      </el-form-item>
      <el-form-item label="Last name">
        <el-input v-model="person.lastname"></el-input>
      </el-form-item>
      <el-form-item label="Nickname">
        <el-input v-model="person.nickname"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="person.email" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="Has agreed to the privacy policy">
        <el-checkbox v-model="person.emhasagreedtoprivacypolicyail" :disabled="true"></el-checkbox>
      </el-form-item>
      <el-form-item v-if="person.hasorderedticket==true" label="Has paid for ticket">
        <el-checkbox v-model="person.haspaid" :disabled="true"></el-checkbox>
      </el-form-item>
      <el-form-item label="Has ordered a ticket">
        <el-checkbox v-model="person.hasorderedticket" :disabled="true"></el-checkbox>
      </el-form-item>
      <el-form-item label="Last updated">
        <el-date-picker v-model="person.modifdate" :disabled="true" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="Account created">
        <el-date-picker v-model="person.createdate" :disabled="true" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item v-if="person.teamname" label="Team name">
        <el-input  v-model="person.teamname" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <el-button
      style="margin-top: 12px;"
      type="primary"
      :disabled="!zijnGegevensValid"
      @click="updatePersonalDetails"
    >save</el-button>
  </div>
</template>

<script lang="ts">
import { person } from "../models/Person";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { backendService } from "../services/backendservice"

@Component
export default class Profile extends Vue {
  person: person = new person();

  constructor() {
    super();
    this.getData();
  }

  updatePersonalDetails(): void {
    backendService.updatePersonalDetails(this.person).then((response) => {
      this.person = response;
    });
  }
  
  getData() {
    backendService.getPersonalDetails().then((response) => {
      this.person = response;
    });
  }
  get zijnGegevensValid() {
    let isValid: boolean = true;

    if (
      this.person.firstname.length > 0 &&
      this.person.lastname.length > 0 &&
      this.person.email.length > 0
    ) {
      isValid = true;
    } else {
      isValid = false;
    }

    return isValid;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
