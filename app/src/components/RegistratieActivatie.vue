<template>
  <div>
    <h3>Summary of your data</h3>
    <div class="row">
      <div class="col-3">First name</div>
      <div class="col-3">{{person.firstname}}</div>
    </div>
    <div class="row">
      <div class="col-3">Last name</div>
      <div class="col-3">{{person.lastname}}</div>
    </div>
    <div class="row">
      <div class="col-3">Nickname</div>
      <div class="col-3">{{person.nickname}}</div>
    </div>
    <div class="row">
      <div class="col-3">Email</div>
      <div class="col-3">{{person.email}}</div>
    </div>
    <hr>
    <h3>One more thing</h3>
    <h5>Please choose a password for your account</h5>
    <el-row>
      <el-col :span="6">
        <el-form>
          <el-form-item label="Your login">
            <el-input v-model="person.email" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="password" type="password"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-button 
      style="margin-top: 12px;" 
      type="info" 
      @click="back" 
      plain>previous</el-button>
    <el-button
      style="margin-top: 12px;"
      type="primary"
      @click="bevestig" 
      :disabled="!zijnGegevensValid">Looks right, continue with my registration!</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { person } from "../models/Person";
import { backendService } from '@/services/backendservice';

@Component
export default class RegistratieActivatie extends Vue {
  password: string = "";

  @Prop()
  public person!: person;

  bevestig() {
    if (this.password == "") {
      alert("Sorry, no empty passwords!");
    } else if (this.password.length < 10) {
      alert("Sorry, too short! Use at least 10 characters.");
    } else {
      backendService.signup(this.person, this.password);
    }
  }
  back() {
    this.$emit("stapBevestiging", this.person, false);
  }
  get zijnGegevensValid() {
    let isValid: boolean = true;

    if (
      this.password.length > 9
    ) {
      isValid = true;
    } 
    else {
      isValid = false;
    }

    return isValid;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>