<template>
    <div :class="'loader-container ' + (loaderDone?'done':'')">
        <button @click="toggleTheme" class="change-theme">{{ "Переключить тему загрузки" }}</button>
        <LoaderAnimation :percent100="percent100" :toggleTheme="toggleTheme" @done-loader-local="doneLoaderLocal" :typeTheme="typeTheme"/>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoaderAnimation from './LoaderAnimation.vue';
import { ThemesLoader, TypesThemesLoader } from '../../types';

export default defineComponent({
    components: {
        LoaderAnimation
    },
    setup(_, {emit}){
        let loaderDone = ref<boolean>(false)
        const typeTheme = ref<TypesThemesLoader>(ThemesLoader.DEFAULT)
        const percent100 = ref<number>(125)

        function doneLoaderLocal (){
            loaderDone.value = true
            emit("done-loader")
        }

        function toggleTheme(_: Event, theme?: TypesThemesLoader){
            if(theme) typeTheme.value = theme
            else{
                if(typeTheme.value === ThemesLoader.DEFAULT){
                    typeTheme.value = ThemesLoader.DASHBOARD
                    localStorage.setItem('theme', ThemesLoader.DASHBOARD)
                }else{
                    typeTheme.value = ThemesLoader.DEFAULT
                    localStorage.setItem('theme', ThemesLoader.DEFAULT)
                }
            }

            if(typeTheme.value === ThemesLoader.DASHBOARD)
                percent100.value = 100
            else
                percent100.value = 125
            
        }
        
        return {
            loaderDone,
            doneLoaderLocal,
            typeTheme,
            toggleTheme,
            percent100
        }
    }
})
</script>
<style lang="scss">
    @use 'loader';
</style>