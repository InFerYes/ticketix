<template>
<div>
  <h1>Registratie</h1>
  <el-steps :active="active" finish-status="success">
    <el-step title="registration"></el-step>
    <el-step title="privacy policy"></el-step>
    <el-step title="confirmation"></el-step>
  </el-steps>
  <RegistratieForm :person="person" v-if="active==0" @stapRegistratieGegevens="reservatieGegevensCallBack"></RegistratieForm>
  <RegistratieReservering :person="person" v-if="active==1" @stapReservering="reserveringCallBack"></RegistratieReservering>
  <RegistratieActivatie :person="person" v-if="active==2" @stapBevestiging="BevestigingCallBack"></RegistratieActivatie>
 
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Provide } from 'vue-property-decorator';
import RegistratieForm from './RegistratieForm.vue'
import RegistratieReservering from './RegistratieReservering.vue'
import RegistratieActivatie from './RegistratieActivatie.vue'
import { person } from '../models/Person'
@Component(
  {components:{RegistratieForm,RegistratieReservering,RegistratieActivatie}}
)
export default class Registratie extends Vue {
 
  public person=new person();
 

  constructor() {
    super();
  }

  public active:number=0;

  reservatieGegevensCallBack(registratieLan:person){
    this.person=registratieLan;
    this.active++;
  }
  reserveringCallBack(registratieLan:person,isnextstep:boolean){
       this.person=registratieLan;
    if(isnextstep)this.active++; else this.active--;

  }
  BevestigingCallBack(registratieLan:person,isnextstep:boolean){
       this.person=registratieLan;
    if(isnextstep)this.active++; else this.active--;

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>