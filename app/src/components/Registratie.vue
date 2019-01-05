<template>
<div>
  <h1>Registratie</h1>
  <el-steps :active="active" finish-status="success">
  <el-step title="registratie"></el-step>
  <el-step title="reservering"></el-step>
  <el-step title="activatie"></el-step>
</el-steps>
  <RegistratieForm v-if="active==0"></RegistratieForm>
  <RegistratieReservering v-if="active==1"></RegistratieReservering>
    <RegistratieActivatie v-if="active==2"></RegistratieActivatie>
    <el-button style="margin-top: 12px;" @click="back">terug</el-button>
  <el-button style="margin-top: 12px;" @click="next">volgende</el-button> 
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RegistratieForm from './RegistratieForm.vue'
import RegistratieReservering from './RegistratieReservering.vue'
import RegistratieActivatie from './RegistratieActivatie.vue'

@Component(
  {components:{RegistratieForm,RegistratieReservering,RegistratieActivatie}}
)
export default class Registratie extends Vue {
 public active:number=0;
      next() {
        if (this.active++ > 2) this.active = 0;
      }
      back(){
        if(this.active!=0){
          this.active--
        }
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>