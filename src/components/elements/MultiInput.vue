<template>
    <div class="multi-input">
        <label :for="'inp'+action">{{title}}</label>
        <input 
        :id="'inp'+action" 
        type="text"
        v-model="inputValueLocal"
        @input="updateInputValue"/>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { InputActions, InputActionsType } from '../../types';

export default defineComponent({
    name: 'MultiInput',
    props: {
        action: {
            type: Number as PropType<InputActionsType>,
            required: true
        },
        inputValue: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    setup(props: any, {emit}) {
        const inputValueLocal = ref(props.inputValue);

        const updateInputValue = (e: Event) => {
            const target = e.target as HTMLInputElement
            switch (props.action) {
                case InputActions.NAME:{
                if(target.value.length < 30){
                    inputValueLocal.value = target.value;
                    emit('update:mpUpdate', target.value, props.action);
                }else inputValueLocal.value = props.inputValue;
                

                break;
                }
                case InputActions.VALUE:{
                if(+target.value > 100000000){
                    inputValueLocal.value = 100000000;
                    emit('update:mpUpdate', 100000000, props.action);
                }
                else if(+target.value < 0) {
                    inputValueLocal.value = 0;
                    emit('update:mpUpdate', 0, props.action);
                }
                else if(isNaN(+target.value)) {
                    inputValueLocal.value = props.inputValue;
                }
                else {
                    inputValueLocal.value = +target.value;
                    emit('update:mpUpdate', +target.value, props.action);
                }

                break;
                }   
                case InputActions.COLOR:{
                if(target.value.length < 8){
                    inputValueLocal.value = "#" + target.value.slice(1);
                    emit('update:mpUpdate', target.value, props.action);
                }else inputValueLocal.value = props.inputValue;

                break;
                }
            
                default: 
                    break;
            }
        }


        return {
            InputActions,
            inputValueLocal,
            updateInputValue
        }
    }
})
</script>
<style lang="scss">
    .multi-input{
        position: relative;
        border-radius: 10px;
        background-color: #fff;
        border: 1px solid #DBDFE9;
        
        &:focus-within{
            border: 1px solid #1B84FF;
        }
        label{
            position: absolute;
            cursor: text;
            font-size: 12px;
            top: 5px;
            left: 1em;
            color: #99A1B7;
        }
        input{
            border: none;
            width: 100%;
            box-sizing: border-box;
            border-radius: 10px;
            outline: none;
            padding: 1.5em 1em .5em 1em;
            font-size: 16px;
        }
    }
</style>