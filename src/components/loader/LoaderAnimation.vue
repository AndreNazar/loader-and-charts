<template>
    <div ref="loaderRef" :class="'loader-block ' + getClassBlockLoader">
            
            <svg class="success-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18.57">
                <polygon fill="#2aa043" points="0 8.57 6.86 18.57 24 1.43 24 1.43 22.86 0 6.86 15.71 1.14 7.14 0 8.57"/>
            </svg>
            <svg class="error-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.85 14.85">
                <polygon fill="#9e2b2b" points="14.85 0.71 14.14 0 7.42 6.72 0.71 0 0 0.71 6.72 7.42 0 14.14 0.71 14.85 7.42 8.13 14.14 14.85 14.85 14.14 8.13 7.42 14.85 0.71"/>
            </svg>
            <svg class="warning-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
                <path fill="#e7a23d" d="M15.36,9.22a7.5,7.5,0,1,0,7.5,7.5A7.5,7.5,0,0,0,15.36,9.22Zm.57,3.39-.17,5.76H15l-.17-5.76Zm-.57,8.22a.71.71,0,0,1-.71-.75.7.7,0,0,1,.71-.74.68.68,0,0,1,.7.74A.7.7,0,0,1,15.36,20.83Z" transform="translate(-7.86 -9.22)"/>
            </svg>
            
            <p class="percent-text">{{valuePercent.toFixed(0)}}%</p>
            <svg
                :class="'spinner ' + getThemeSpinner"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        :class="'path-1 path'"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="#e6e6e6"
                        stroke-linecap="round"
                        stroke-width="2"
                    />
                    <circle
                        :class="'path-2 path ' + getClassExtra"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke-dasharray="200"
                        :stroke-dashoffset="1000 - resultLocal"
                        stroke-width="2"
                    />
            </svg>

            <button v-if="isError || isWarning" class="fix-error" @click="isError ? fixError() : fixWarning()">
                {{isError ? 'Исправить ошибку' : 'Исправить предупреждение'}}
            </button>

        </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { ThemesLoader, TypesThemesLoader } from '../../types'

export default defineComponent({
    props: {
        typeTheme: {
            type: Object as PropType<TypesThemesLoader>,
            required: true
        },
        toggleTheme: {
            type: Function,
            required: true
        },
        percent100: {
            type: Number,
            required: true
        }
    },
    setup(props, {emit}) {
        const loaderRef = ref<{classList: {add: (str:string) => void}} | null>(null)
        const isError = ref<boolean>(false)
        const isWarning = ref<boolean>(false)
        const isFixError = ref<boolean>(false)
        const isFixWarning = ref<boolean>(false)
        let classExtra = ref<String>("")
        let classBeforeSide = ref<String>("")
        const valuePercent = ref<number>(0)
        let timer: any = null;


        function updateValue() {
            valuePercent.value += .1
            if(valuePercent.value > 100) clearInterval(timer)
        }
        
        const resultLocal = computed(() => {
            return (valuePercent.value * props.percent100) / 100;
        })
        const getClassExtra = computed(() => {
            if(valuePercent.value > 0 && valuePercent.value < 30) return "in-progress-1"
            else if(valuePercent.value > 30 && valuePercent.value < 60) return "in-progress-2"
            else if(valuePercent.value > 60 && valuePercent.value < 90) return "in-progress-3"
            else if(valuePercent.value > 90 && valuePercent.value < 100) return "in-progress-4"
            else if(valuePercent.value > 100) {
                emit("done-loader-local")
            }
            return ""
        })
        const getClassBlockLoader = computed(() => {
            if(valuePercent.value >= 43 && !isFixError.value) return callError()
            if(valuePercent.value >= 60 && !isFixWarning.value) return callWarning()
            if(classExtra.value !== "error" && classExtra.value !== "warning" && valuePercent.value >= 100){
                return "success"
            }
            return "animate-loader"
        })
        

        const callError = () => {
            classBeforeSide.value = classExtra.value
            isError.value = true
            clearInterval(timer)
            return "error"
        }
        const callWarning = () => {
            classBeforeSide.value = classExtra.value
            isWarning.value = true
            clearInterval(timer)
            return "warning"
        }
        const fixWarning = () => {
            isWarning.value = false
            isFixWarning.value = true
            classExtra.value = classBeforeSide.value
            classBeforeSide.value = ""
            timer = setInterval(updateValue, 10);
        }
        const fixError = () => {
            isError.value = false
            isFixError.value = true
            classExtra.value = classBeforeSide.value
            classBeforeSide.value = ""
            timer = setInterval(updateValue, 10);
        }
        onMounted(() => {
            const theme = localStorage.getItem('theme')
            if(theme === ThemesLoader.DASHBOARD) {
                props.toggleTheme(ThemesLoader.DASHBOARD)
            }else{
                props.toggleTheme(ThemesLoader.DEFAULT)
            }
        })

        const getThemeSpinner = computed(() => {
            if(props.typeTheme === ThemesLoader.DASHBOARD) return "dashboard"
            return ""
        })
        
        timer = setInterval(updateValue, 10);


        return {
            classExtra,
            valuePercent,
            resultLocal,
            loaderRef,
            getClassExtra,
            fixWarning,
            fixError,
            getClassBlockLoader,
            isError, 
            isWarning,
            getThemeSpinner
        }
    },
})
</script>
<style lang="ts">
    
</style>