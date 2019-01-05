<template>

  <div class="container-fluid">
    <div class="jumbotron">
    <h1 class="display-4">LAN Party registratie</h1>
    <p class="lead">Welkom! Registreer je simpelweg met een paar klikken via onze web app.</p>
    <hr class="my-4">
    <p>Maak ook je eigen team en nodig je vrienden uit!</p>
     <ul class="nav nav-pills">
        <li class="nav-item ">
          <router-link class="nav-link active" to="/registratie">Registratie</router-link>
        </li>
         <li class="nav-item">
          <router-link class="nav-link" to="/createteam">Create team</router-link>
        </li>
      
     
    </ul>
    </div>

   
    <router-view/>
  </div>
</template>

<style>

</style>
