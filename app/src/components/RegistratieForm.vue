<template>
  <div>
    <h3>Please tell us who you are:</h3>
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
    <el-button style="margin-top: 12px;" type="primary" :disabled="!zijnGegevensValid" @click="next">next</el-button>
  </div>
</template>

<script lang="ts">
import { person } from "../models/Person";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RegistratieForm extends Vue {
  @Prop()
  public person!: person;

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

  next(event: Event) {
    this.$emit("stapRegistratieGegevens", this.person);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>