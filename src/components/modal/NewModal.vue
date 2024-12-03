<template>
    <div class="modal-container" @click="$emit('close-modal')">
        <ModalBlock 
        @click.stop 
        :modalParams="modalParams"
        :openModal="openModal"
        @update:mpUpdate="updateEvent"
        :addSector="addSector"
        :editSector="editSector"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ModalBlock from './ModalBlock.vue';
import { IModalParams, InputActionsType, ISector, TOpenModalFunc } from '../../types';

export default defineComponent({
    name: 'NewModal',
    props: {
        modalParams: {
            type: Object as PropType<IModalParams>,
            required: true
        },
        openModal: {
            type: Function as PropType<TOpenModalFunc>,
            required: true
        },
        addSector: {
            type: Function as PropType<(newsector: IModalParams) => void>,
            required: true
        },
        editSector: {
            type: Function as PropType<(editSectorData: ISector) => void>,
            required: true
        }
    },
    components: { ModalBlock },
    methods: {
        updateEvent(value: string, action: InputActionsType) {
            this.$emit('update:mpUpdate', value, action);
        }
    }
})

</script>
<style lang="scss">
    @use 'modal';
</style>