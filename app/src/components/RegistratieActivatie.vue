<template>
    <div>
        <h3>Summary of your data</h3>
        <div class="row">
            <div class="col-3">First name</div>
            <div class="col-3">{{registratieLanModel.requestor.firstName}}</div>
        </div>
        <div class="row">
            <div class="col-3">Last name</div>
            <div class="col-3">{{registratieLanModel.requestor.lastName}}</div>
        </div>
        <div class="row">
            <div class="col-3">Email</div>
            <div class="col-3">{{registratieLanModel.requestor.email}}</div>
        </div>
        <div class="row">
            <div class="col-3"><el-button style="margin-top: 12px;"  @click="bevestig">Looks right, continue my registration!</el-button></div>
        </div>
        <el-button style="margin-top: 12px;"  @click="back">previous</el-button>  
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {registratieLan} from '../models/RegistratieLan'
import {firebaseService} from '../services/firebaseservice'
@Component
export default class RegistratieActivatie extends Vue {
    
    public service=firebaseService;
    @Prop()
   public registratieLanModel!:registratieLan;
   bevestig(){
       this.service.saveRegistratie(this.registratieLanModel);
   }
    back(){
           this.$emit('stapBevestiging', this.registratieLanModel,false);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>