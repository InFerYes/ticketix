<template>
  <div>
      <div v-if="!isLoggedIn">
        <h1>Your account has been activated.</h1>
        <p>Thanks for joining us. You can now proceed to <router-link to="login">log in</router-link>.</p>
      </div>
      <div v-else>
        <h1>Woops, your account has already been activated.</h1>
        <p>You are already logged in.</p>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { backendService } from '@/services/backendservice';

@Component
export default class VerifyEmail extends Vue {
    public isLoggedIn: boolean = false;
    constructor() {
        super();
        this.checkLogin();
    }

    checkLogin(){
        backendService.isLoggedIn().then((value) => {
            this.isLoggedIn = value;
        })
    }
}
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
</style>