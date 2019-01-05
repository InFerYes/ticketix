# ticketix
Ticket sales and seat selector

## Gebruik van technologieën ##

Ticketing maakt gebruik van volgende technologieën:
1. Vue + Vue Cli :https://vuejs.org/
2. Boostrap : https://getbootstrap.com/
3. Element.IO :https://element.eleme.io/#/en-US
4. Typescript : https://www.typescriptlang.org/


## Gebruik van components ##
Components worden gemaakt in .vue files. De .vue files begint meestal met deze opmaak: 
1. Template tag
2. script tag die gebruikt maakt van Typescript
3. Style tag

Meestal word er ook gebruik gemaakt van de component decorator  die word opgehaald uit vue-property-decorator. 
De decorator zorgt ervoor dat je typescript class als component wordt gebruikt.  Je kan deze nog enkele properties meegeven, bvb als je een andere component wilt inladen. 

Voorbeeld: 
'''
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
'''

## Gebruik van de router ##

De router import de components die nodig zijn voor de navigatie. 
Vervolgens stellen we de router , welk pad naar welke component verwijst 

voorbeeld : 
'''
import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Registratie from './components/Registratie.vue'
import CreateTeam from './components/CreateTeam.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/registratie',
      name: 'registratie',
      component:Registratie
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/createteam',
      name: 'createteam',
      component: CreateTeam
    },
  ]
})
'''
