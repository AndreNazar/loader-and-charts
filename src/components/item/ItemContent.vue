
<template>
  <div class="item-content">
    <div class="info-block">
        <p class="title">{{sector.name}}</p>
            <span class="line"></span>
        <p class="value">{{getPercent()}}%</p>
            <span class="line"></span>
        <div :style="{ backgroundColor: sector.color }" class="color"></div>
    </div>
    <div class="control-block no-selection">
        <Button :sectorData="sector" :openModal="openModal" @open-modal="openModal"     :action="ButtonActions.OPEN_EDIT" />
        <Button :sectorData="sector" @trash-sector="trashSector" :action="ButtonActions.TRASH" />
    </div>
  </div>
</template>

<script lang="ts">
import { ButtonActions, ISector, TOpenModalFunc, TTrashFunc } from '../../types';
import Button from '../elements/Button.vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'ItemContent',
    data() { return { ButtonActions } },
    components: { Button },
    props: {
        sector: {
            type: Object as PropType<ISector>,
            required: true
        },
        openModal: {
            type: Function as PropType<TOpenModalFunc>,
            required: true
        },
        trashSector: {
            type: Function as PropType<TTrashFunc>,
            required: true
        },
        sumValuesSectors: {
            type: Number,
            required: true
        }
    },
    setup(props){
        const getPercent = () => ((props.sector.value / props.sumValuesSectors) * 100 ).toFixed(0)
        return {getPercent}
    }
})
</script>

<style lang="scss" scoped>
@use 'item-content';
</style>../../types