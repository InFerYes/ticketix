<template>
<div>
  <h1>Registratie</h1>
  <el-steps :active="active" finish-status="success">
    <el-step title="registratie"></el-step>
    <el-step title="reservering"></el-step>
    <el-step title="bevestiging"></el-step>
  </el-steps>
  <RegistratieForm :registratieLanModel="registratieModel" v-if="active==0" @stapRegistratieGegevens="reservatieGegevensCallBack"></RegistratieForm>
  <RegistratieReservering :registratieLanModel="registratieModel" v-if="active==1" @stapReservering="reserveringCallBack"></RegistratieReservering>
  <RegistratieActivatie :registratieLanModel="registratieModel" v-if="active==2" @stapBevestiging="BevestigingCallBack"></RegistratieActivatie>
 
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Provide } from 'vue-property-decorator';
import RegistratieForm from './RegistratieForm.vue'
import RegistratieReservering from './RegistratieReservering.vue'
import RegistratieActivatie from './RegistratieActivatie.vue'
import {registratieLan} from '../models/RegistratieLan'
import { person } from '../models/Person'
@Component(
  {components:{RegistratieForm,RegistratieReservering,RegistratieActivatie}}
)
export default class Registratie extends Vue {
 
  public registratieModel=new registratieLan();
 

  constructor() {
    super();
  }

  public active:number=0;

  reservatieGegevensCallBack(registratieLan:registratieLan){
    this.registratieModel=registratieLan;
    this.active++;
  }
  reserveringCallBack(registratieLan:registratieLan,isnextstep:boolean){
       this.registratieModel=registratieLan;
    if(isnextstep)this.active++; else this.active--;

  }
  BevestigingCallBack(registratieLan:registratieLan,isnextstep:boolean){
       this.registratieModel=registratieLan;
    if(isnextstep)this.active++; else this.active--;

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>