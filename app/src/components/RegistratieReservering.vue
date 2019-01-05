<template>
<div>
    <p>Met de reserving ga je akkoord met onze voorwaarden :   <el-checkbox v-model="akkoord" @change="genereerCodeOverschrijving" label="Gaat akkoord" border></el-checkbox></p>
    <p>Als je akkoord gaat met de voorwaarden krijg je een unieke code ,deze gebruik je voor de overschrijving. Van zodra de overschrijving bij ons is toegekomen krijg je een bevestiging.</p>
    <div v-if="akkoord">
            <p>Gebruikt volgende unieke code bij overschrijving:<strong>{{code}}</strong></p>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RegistratieReservering extends Vue {
    akkoord:boolean=false;
    code:number=0;
   
    genereerCodeOverschrijving(){
        if(this.akkoord){
            this.code =Math.floor(Math.random()*90000) + 10000;
            let datum=new Date();
            let tijdstamp=datum.getHours()+datum.getMinutes()+datum.getSeconds()+datum.getMilliseconds();
            this.code+=tijdstamp;
        }
       
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>