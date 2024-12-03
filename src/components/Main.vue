
<template>
  <div class="main-container">
    <Loader 
    @done-loader="doneLoader"
    v-if="isLoading" />
    <NewModal
    v-if="showModal" 
    @close-modal="closeModal"
    :modalParams="modalParams"
    :openModal="openModal"
    @update:mpUpdate="updateModalParams"
    :addSector="addSector"
    :editSector="editSector"
    />
    
    <div class="main-block">
      <h2>Круговая диаграмма</h2>
      <hr />
      <div class="block-content">
        <div class="items-block">
          <transition-group name="list" tag="ul" class="list">
            <li v-for="sector in sectorsData" :key="sector.id" class="list-item">
              <ItemContent 
              :openModal="openModal"
              :trashSector="trashSector"
              :sector="sector"
              :sumValuesSectors="sumValuesSectors" />
            </li>
          </transition-group>
            <Button 
              :action="ButtonActions.OPEN_ADD"
              @open-modal="openModal"
            />
          </div>
        <div class="chart-block">
          <ChartBlock
          :sectorsData="sectorsData"  />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ButtonActions, IModalParams, InputActions, InputActionsType, ISector, TOpenModalFunc, TTrashFunc } from '../types';
import Button from './elements/Button.vue';
import ChartBlock from './ChartBlock.vue';
import ItemContent from './item/ItemContent.vue'
import NewModal from './modal/NewModal.vue'
import { computed, ref } from 'vue';
import Loader from './loader/Loader.vue';

const showModal = ref(false);
const isLoading = ref<boolean>(true);
const modalParams = ref<IModalParams>({
  type: ButtonActions.OPEN_ADD,
  id: -1,
  name: '',
  value: 0,
  color: '#ffffff',
});

const sectorsData = ref<ISector[]>([
  {
    id: 1,
    name: 'Сектор-1',
    value: 25,
    color: '#ffff66',
  },
  {
    id: 2,
    name: 'Сектор-2',
    value: 40,
    color: '#ff66ff',
  },
  {
    id: 3,
    name: 'Сектор-3',
    value: 35,
    color: '#66ffff',
  },

]);

const sumValuesSectors = computed(() => {
  return sectorsData.value.reduce((acc: number, s: ISector) => acc + s.value, 0)
})

const openModal:TOpenModalFunc = (data) => {

  if(data.action === ButtonActions.OPEN_EDIT) {
    console.log(data.sector)
    modalParams.value.id  = data.sector!.id
    modalParams.value.name  = data.sector!.name
    modalParams.value.value = data.sector!.value
    modalParams.value.color = data.sector!.color
  }

  showModal.value = true;
  modalParams.value.type = data.action;
}
const trashSector: TTrashFunc = (action) => {
  sectorsData.value = sectorsData.value.filter((item: ISector) => item.id !== action);
}
const updateModalParams = (value: string, action: InputActionsType) => {
  
  switch (action) {
    case InputActions.NAME: modalParams.value.name = value
      break;
    case InputActions.COLOR: modalParams.value.color = value
      break;
    case InputActions.VALUE: modalParams.value.value = +value
      break;
    default:
      break;
  }
}

const doneLoader = () => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000);
}

const addSector = (newsector: IModalParams) => {
  closeModal()
  sectorsData.value = [...sectorsData.value, {
    id: sectorsData.value.length + 1,
    name: newsector.name,
    value: newsector.value,
    color: newsector.color
  }]
}

const closeModal = () => {
  showModal.value = false
  modalParams.value = {
    type: ButtonActions.OPEN_ADD,
    id: -1,
    name: '',
    value: 0,
    color: '#ffffff',
  }
}

const editSector = (editSectorData: ISector) => {
  console.log(editSectorData)
  closeModal()
  sectorsData.value = sectorsData.value.map((sector: ISector) => sector.id === editSectorData.id 
  ? {
    ...sector, 
    name: editSectorData.name, 
    value: editSectorData.value, 
    color: editSectorData.color
  } 
  : sector)
}

</script>


<style lang="scss" scoped>
@use 'main';
</style>./item/ItemContent.vue
