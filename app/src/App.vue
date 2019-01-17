<template>

  <div class="container-fluid">
    <div class="jumbotron">
    <h1 class="display-4">LAN Party registration</h1>
    <p class="lead">Welcome! Registration is easy and painless.</p>
    <hr class="my-4">
    <p>Create your own team and invite your friends!</p>
     <ul class="nav nav-pills">
        <li class="nav-item ">
          <router-link class="nav-link active" to="/registratie">Registration</router-link>
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
