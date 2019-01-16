<template>
<div>
    <h3>Voer je gegevens in:</h3>
        <el-form  label-width="100px">
        <el-form-item label="Voornaam">
            <el-input v-model="registratieLanModel.requestor.firstName"></el-input>
        </el-form-item>
        <el-form-item label="Achternaam">
            <el-input v-model="registratieLanModel.requestor.lastName"></el-input>
        </el-form-item>
    </el-form>
    <el-button style="margin-top: 12px;" :disabled="zijnGegevensValid" @click="next">volgende</el-button> 
</div>
</template>

<script lang="ts">

import { person } from '../models/Person'
import { Component, Prop, Vue } from 'vue-property-decorator';
import {registratieLan} from '../models/RegistratieLan'

@Component
export default class RegistratieForm extends Vue {
 
    @Prop()
    public registratieLanModel!:registratieLan;

   //persoon!:Persoon

    get zijnGegevensValid(){
        let isValid:boolean=true;

        if (this.registratieLanModel.requestor.firstName.length >1 && this.registratieLanModel.requestor.lastName.length >1 && this.registratieLanModel.requestor.email.length >1) {
            isValid = true;
        }
        else {
            isValid = false;
        }

       return isValid;
    }

    next(event:Event) {
      this.$emit('stapRegistratieGegevens', this.registratieLanModel);
    }

    // changeAantalPersonen(){
    //     this.registratieLanModel.personen=[];
    //     for(let x=0;x<this.aantal;x++){
    //         this.registratieLanModel.personen.push(new persoon());
    //     }
    // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>