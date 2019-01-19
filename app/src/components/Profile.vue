<template>
  <div>
    <h1>Your profile</h1>
    <h3>This is what we have on record:</h3>
   <el-form label-width="100px">
      <el-form-item label="First name">
        <el-input v-model="person.firstName"></el-input>
      </el-form-item>
      <el-form-item label="Last name">
        <el-input v-model="person.lastName"></el-input>
      </el-form-item>
      <el-form-item label="Nickname">
        <el-input v-model="person.nickName"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="person.email"></el-input>
      </el-form-item>
    </el-form>
    <el-button style="margin-top: 12px;" type="primary" :disabled="!zijnGegevensValid" @click="next">save</el-button>
  </div>
</template>

<script lang="ts">
import { person } from "../models/Person";
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Profile extends Vue {
  public person: person = new person();
   get zijnGegevensValid() {
    let isValid: boolean = true;

    if (
      this.person.firstName.length > 0 &&
      this.person.lastName.length > 0 &&
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
