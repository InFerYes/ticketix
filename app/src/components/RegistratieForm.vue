<template>
<div>
    <h3>Team of nickname als je alleent bent</h3>
        <el-form  label-width="100px">
        <el-form-item label="team">
            <el-input v-model="registratieLanModel.team"></el-input>
        </el-form-item>
        <el-form-item label="Omschrijving">
            <el-input type="textarea" v-model="registratieLanModel.omschrijving"></el-input>
        </el-form-item>
    </el-form>
    <h3>Aantal personen</h3>
    <div class="block">
        <el-slider :min="1" :max="5" v-model="aantal" @change="changeAantalPersonen" show-input>
        </el-slider>
    </div>
    <div v-for="(p,index) in registratieLanModel.personen" :key="index">
        <b>Speler {{index+1}}</b>
    <el-form  label-width="100px">
        <el-form-item label="Voornaam">
            <el-input v-model="p.voornaam"></el-input>
        </el-form-item>
        <el-form-item label="Familienaam">
            <el-input v-model="p.familienaam"></el-input>
        </el-form-item>
        <el-form-item label="Email">
            <el-input v-model="p.email"></el-input>
        </el-form-item>
    </el-form>

    </div>


<el-button style="margin-top: 12px;" :disabled="zijnGegevensValid" @click="next">volgende</el-button> 
</div>
</template>

<script lang="ts">

import {persoon} from '../models/Persoon'
import { Component, Prop, Vue } from 'vue-property-decorator';
import {registratieLan} from '../models/RegistratieLan'

@Component
export default class RegistratieForm extends Vue {
   
   public aantal:number=1;
   
    @Prop()
   public registratieLanModel!:registratieLan;

   //persoon!:Persoon

    get zijnGegevensValid(){
        let isValid:boolean=true;
        for(let item of this.registratieLanModel.personen){
             if(this.registratieLanModel.team.length>5 && item.voornaam.length>1 && item.familienaam.length>1 && item.email.length>10){
                 isValid=false;
            }else{
                isValid=true;
            }
        }
       return isValid;
    }

    next(event:Event) {
      this.$emit('stapRegistratieGegevens', this.registratieLanModel);
    }

    changeAantalPersonen(){
        this.registratieLanModel.personen=[];
        for(let x=0;x<this.aantal;x++){
            this.registratieLanModel.personen.push(new persoon());
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>