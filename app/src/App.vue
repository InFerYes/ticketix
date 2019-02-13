<template>
  <div class="container-fluid">
    <div class="jumbotron">
      <h1 class="display-4">Ticketix</h1>
      <p class="lead">LAN Management made easy.</p>
      <hr class="my-4">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link class="nav-link active" to="/registration">Registration</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/teamview">Team</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/profile">Profile</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/verifyemail">Verify email</router-link>
        </li> -->
      </ul>
    </div>
    <el-button type="text" @click="logout">Log out</el-button>
    <el-button type="text" @click="checkLogin">wat</el-button>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { message } from "./models/Message";
import { backendService } from '@/services/backendservice';

@Component
export default class RegistratieForm extends Vue {
  isLoggedIn: boolean = false;

  constructor() {
    super();
    this.checkLogin();
    this.checkLogin2();
  }

  checkLogin(){
    this.isLoggedIn = backendService.loggedin;
  }

  checkLogin2(){
        backendService.isLoggedIn().then((value) => {
            this.isLoggedIn = value;
        })
    }

  logout(): void {
    backendService.logout();
  }

  //Werkend voorbeeld van een watch (doe ook: import { Component, Prop, Vue, Watch } from "vue-property-decorator";)
  @Watch("backendService.loggedin")
  onPropertyChanged(value: boolean, oldValue: boolean) {
    this.isLoggedIn = value;
  }
}
</script>

<style>
</style>
