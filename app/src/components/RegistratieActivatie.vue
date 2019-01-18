<template>
  <div>
    <h3>Summary of your data</h3>
    <div class="row">
      <div class="col-3">First name</div>
      <div class="col-3">{{person.firstName}}</div>
    </div>
    <div class="row">
      <div class="col-3">Last name</div>
      <div class="col-3">{{person.lastName}}</div>
    </div>
    <div class="row">
      <div class="col-3">Nickname</div>
      <div class="col-3">{{person.nickName}}</div>
    </div>
    <div class="row">
      <div class="col-3">Email</div>
      <div class="col-3">{{person.email}}</div>
    </div>
    <hr>
    <h3>One more thing</h3>
    {{registratieLanModel}}
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
    <el-button style="margin-top: 12px;" type="info" @click="back" plain>previous</el-button>
    <el-button
      style="margin-top: 12px;"
      type="primary"
      @click="bevestig"
    >Looks right, continue with my registration!</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { person } from "../models/Person";
import { firebaseService } from "../services/firebaseservice";
@Component
export default class RegistratieActivatie extends Vue {
  public service = firebaseService;
  password: string = "";

  @Prop()
  public person!: person;

  bevestig() {
    if (this.password == "") {
      alert("Sorry, no empty passwords!");
    } else if (this.password.length < 10) {
      alert("Sorry, too short! Use at least 10 characters.");
    } else {
      this.service.signup(this.person, this.password);
    }
  }
  back() {
    this.$emit("stapBevestiging", this.person, false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>