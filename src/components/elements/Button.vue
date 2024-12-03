<template>
    <div :ref="'ref'" @click="onClick" class="button-container no-selection" :class="getClass">
        <p>{{getTitle}}</p>
        <img v-if="action === ButtonActions.OPEN_EDIT" src="../../assets/edit.svg" alt="">
        <img v-if="action === ButtonActions.TRASH" src="../../assets/trash.svg" alt="">
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from '../../services/Button';
import { ButtonActions, ButtonActionsType, IModalParams, ISector } from '../../types';

export default defineComponent({
    name: 'Button',
    props: {
        action: {
            type: String as PropType<ButtonActionsType>,
            required: true
        },
        sectorData: {
            type: Object as PropType<ISector>,
            required: false
        },
        modalData: {
            type: Object as PropType<IModalParams>,
            required: false
        }
    },
    setup() {
        return {
            ButtonActions
        }
    },
    methods: {
        onClick() {
            const button = new Button( this.$emit );
            switch (this.action) {
                case ButtonActions.ADD: {
                    button.addSector(this.modalData!);
                    break;
                }
                case ButtonActions.EDIT: {
                    button.editSector(this.modalData!);
                    break;
                }
                case ButtonActions.OPEN_ADD: {
                    button.openAddModal();
                    break;
                }
                case ButtonActions.OPEN_EDIT: {
                    button.openEditModal(this.sectorData!);
                    break;
                }
                case ButtonActions.TRASH: {
                    button.trashSector(this.sectorData!.id);
                    break;
                }

                default: break;
            }
        },
    },
    computed: {
        getClass() {
            switch (this.action) {
                case ButtonActions.OPEN_EDIT:
                case ButtonActions.TRASH: return 'icon-button';
                default: return 'default-button';
            }
        },
        getTitle() {
            switch (this.action) {
                case ButtonActions.ADD:
                case ButtonActions.OPEN_ADD: return 'Добавить сектор';
                case ButtonActions.EDIT: return 'Редактировать сектор';
                default: return '';
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .1s;

    &.default-button {
        color: #fff;
        padding: 1em;
        background-color: #1b84ff;
        border-radius: 10px;
    }

    &.icon-button {}

    &:hover {
        cursor: pointer;
        opacity: .9;
    }

    &:active {
        opacity: .8;
    }

    p {
        margin: 0
    }
}
</style>