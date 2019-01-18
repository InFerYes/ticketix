<template>
<div>
    <p>You agree to have read our <a href="https://www.holysh1t.net/about/privacy-policy/" target="_blank">privacy policy </a>
    <el-checkbox v-model="registratieLanModel.requestor.hasAgreedToPrivacyPolicy" @change="genereerCodeOverschrijving" label="I agree" border></el-checkbox></p>
    <el-button style="margin-top: 12px;" type="info"  @click="back" plain>previous</el-button>
    <el-button style="margin-top: 12px;" type="primary" :disabled="!registratieLanModel.requestor.hasAgreedToPrivacyPolicy" @click="next">next</el-button> 
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import {registratieLan} from '../models/RegistratieLan'
@Component
export default class RegistratieReservering extends Vue {
 
    @Prop()
   public registratieLanModel!:registratieLan;

    genereerCodeOverschrijving(){
        if(this.registratieLanModel.requestor.hasAgreedToPrivacyPolicy){
            if(this.registratieLanModel.registerCode == null || this.registratieLanModel.registerCode == 0) {
                this.registratieLanModel.registerCode+=Math.floor(Math.random()*90000) + 10000;
                let datum=new Date();
                let tijdstamp=datum.getHours()+datum.getMinutes()+datum.getSeconds()+datum.getMilliseconds();
                this.registratieLanModel.registerCode+=tijdstamp;
            }
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