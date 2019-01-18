<template>
  <div class="login">
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
import { firebaseService } from "../services/firebaseservice";

@Component
export default class Login extends Vue {
  email: string = "";
  password: string = "";
  //@Prop()
  login() {
    firebaseService.login(this.email, this.password);
  }
}
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
</style>