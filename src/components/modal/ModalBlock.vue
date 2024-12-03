<template>
    <div class="modal-block">
        <h3>{{getTitle()}}</h3>
        <MultiInput @update:mpUpdate="updateEvent" :action="InputActions.NAME"  :inputValue="nameInput"  :title="'Наименование'" />
        <MultiInput @update:mpUpdate="updateEvent" :action="InputActions.VALUE" :inputValue="valueInput.toString()" :title="'Значение'" />
        <Vue3ColorPicker 
        v-model="colorInput" 
        mode="solid"
        :showColorList="false" 
        :showEyeDrop="false"
        :showAlpha="false"/>
        
        <Button 
        :modalData="modalParams" 
        @add-sector="addSector" 
        @edit-sector="editSector" 
        :action="getAction()" />
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import MultiInput from '../elements/MultiInput.vue';
import Button from '../elements/Button.vue';
import { ButtonActions, IModalParams, TOpenModalFunc, InputActions, InputActionsType, ISector } from '../../types';
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
import '@cyhnkckali/vue3-color-picker/dist/style.css'

export default defineComponent({
    name: 'ModalBlock',
    components: { MultiInput, Button, Vue3ColorPicker },
    props: {
        modalParams: {
            type: Object as PropType<IModalParams>,
            required: true
        },
        addSector: {
            type: Function as PropType<(newsector: IModalParams) => void>,
            required: true
        },
        editSector: {
            type: Function as PropType<(editSectorData: ISector) => void>,
            required: true
        },
        openModal: {
            type: Function as PropType<TOpenModalFunc>,
            required: true
        }
    },
    setup(props, {emit}) {
        
    const nameInput  = ref(props.modalParams.name);
    const valueInput = ref(props.modalParams.value);
    const colorInput = ref(props.modalParams.color);

    
    function updateEvent(value: string, action: InputActionsType) {
        emit('update:mpUpdate', value, action);
    }

    watch(props.modalParams, (newVal) => {


        console.log(newVal.value)
        nameInput.value  = newVal.name;
        valueInput.value = newVal.value;
    }, {deep: true})

    watch(() => colorInput.value, (newVal) => {
        updateEvent(newVal, InputActions.COLOR);
    })

        return {
            ButtonActions,
            InputActions,
            nameInput,
            valueInput,
            colorInput,
            updateEvent
        }
    },
    methods: {
        getTitle() {
            return this.modalParams.type === ButtonActions.OPEN_ADD ? 'Добавить сектор' : 'Редактировать сектор';
        },
        getAction() {
            return this.modalParams.type === ButtonActions.OPEN_ADD ? ButtonActions.ADD : ButtonActions.EDIT ;
        },
    }
})
</script>