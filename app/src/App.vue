<template>
  <div class="container-fluid">
    <div class="jumbotron">
      <h1 class="display-4">Ticketix</h1>
      <p class="lead">LAN Management made easy.</p>
      <hr class="my-4">
      <ul class="nav nav-pills">
        <li class="nav-item" v-if="!isLoggedin">
          <router-link class="nav-link active" to="/registration">Registration</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedin">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedin">
          <router-link class="nav-link" to="/createteam">Create team</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedin">
          <router-link class="nav-link" to="/profile">Profile</router-link>
        </li>
      </ul>
    </div>
    <el-button type="text" @click="logout">Log out</el-button>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { firebaseService } from "./services/firebaseservice";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RegistratieForm extends Vue {
  isLoggedin: boolean = false;

  constructor() {
    super();
    this.checkLogin();
  }

  checkLogin(): void {
    firebaseService.isLoggedIn().then(value => {
      this.isLoggedin = value;
    });
  }

  logout(): void {
    firebaseService.logout();
    this.isLoggedin = false;
  }

  //Werkend voorbeeld van een watch (doe ook: import { Component, Prop, Vue, Watch } from "vue-property-decorator";)
  // @Watch('firebaseService.isLoggedin')
  // onPropertyChanged(value: boolean, oldValue: boolean) {
  //   this.isLoggedin = value;
  // }
}
</script>

<style>
</style>
