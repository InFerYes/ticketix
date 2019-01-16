<template>
<div>
    <h3>Overzicht van je gegevens</h3>
     <div class="row">
        <div class="col-3"><b>Team</b></div><div class="col-2">{{registratieLanModel.team}}</div>
    </div>
    <div class="row">
        <div class="col-3"><b>Aantal tickets</b></div><div class="col-2">{{registratieLanModel.personen.length}}</div>
    </div>
    <div class="row">
        <div class="col-3"><b>Omschrijving</b> </div><div class="col-2">{{registratieLanModel.omschrijving}}</div>
    </div>
     <div class="row">
        <div class="col-3"><el-button style="margin-top: 12px;"  @click="bevestig">Ik ga akkoord met de voorwaarden en bevestig</el-button></div>
    </div>
    <h3>Personen</h3>
    <div class="row">
        <div class="col">
            <table class="table">
                <thead>
                    <tr><th>Voornaam</th>
                   <th>Familienaam</th>
                    <th>Email</th></tr>
                </thead>
                <tbody>
                    <tr v-for="(p,index) in registratieLanModel.personen" :key="index">
                        <td>{{p.voornaam}}</td>
                        <td>{{p.familienaam}}</td>
                        <td>{{p.email}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
          
    </div> 
    <el-button style="margin-top: 12px;"  @click="back">Vorige</el-button>  
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