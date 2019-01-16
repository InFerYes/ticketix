<template>
<div>
    <p>Met de reserving ga je akkoord met onze voorwaarden :   <el-checkbox v-model="registratieLanModel.isAkkoord" @change="genereerCodeOverschrijving" label="Gaat akkoord" border></el-checkbox></p>
    <p>Als je akkoord gaat met de voorwaarden krijg je een unieke code ,deze gebruik je voor de overschrijving. Van zodra de overschrijving bij ons is toegekomen krijg je een bevestiging.</p>
    <div v-if="registratieLanModel.isAkkoord">
            <p>Gebruikt volgende unieke code bij overschrijving:<strong>{{registratieLanModel.code}}</strong></p>
    </div>
        <el-button style="margin-top: 12px;"  @click="back">Vorige</el-button>
    <el-button style="margin-top: 12px;" :disabled="!registratieLanModel.isAkkoord" @click="next">volgende</el-button> 
 
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import {registratieLan} from '../models/RegistratieLan'
@Component
export default class RegistratieReservering extends Vue {
    akkoord:boolean=false;
 
    @Prop()
   public registratieLanModel!:registratieLan;

    genereerCodeOverschrijving(){
        if(this.registratieLanModel.hasAgreedToPrivacyPolicy){
            this.registratieLanModel.registerCode+=Math.floor(Math.random()*90000) + 10000;
            let datum=new Date();
            let tijdstamp=datum.getHours()+datum.getMinutes()+datum.getSeconds()+datum.getMilliseconds();
            this.registratieLanModel.registerCode+=tijdstamp;
        }
    }
    back(){
           this.$emit('stapReservering', this.registratieLanModel,false);
    }
    next(){
         this.$emit('stapReservering', this.registratieLanModel,true);
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>