<template>
  <div>
    <h1>Log in</h1>
    <el-form>
      <el-form-item label="Email">
        <el-input v-model="email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="login">Log in</el-button>
    <p>Don't have an account? Get one
      <router-link to="/registration">here</router-link>.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { account } from "../models/Account";
import { backendService } from "@/services/backendservice";

@Component
export default class Login extends Vue {
  email: string = "";
  password: string = "";
  //@Prop()
  login() {
    let acc: account = <account>{};
    acc.email = this.email;
    acc.password = this.password;
    backendService.login(acc);
  }
}
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
</style>