<template>
<div>
    <el-form :label-position="left" label-width="100px">
        <el-form-item label="Voornaam">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="Familienaam">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="Email">
            <el-input ></el-input>
        </el-form-item>
    </el-form>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RegistratieForm extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>