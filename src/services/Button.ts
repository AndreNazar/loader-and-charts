import { ButtonActions, IModalParams, ISector } from "../types";


export default class Button {
    
    private emit: (event: string, payload?: any) => void;

    constructor(emit: (event: string, payload?: any) => void) {
        this.emit = emit
    }
    addSector(newsector: IModalParams) {
        console.log("Добавление сектора");
        console.log(newsector)
        this.emit('add-sector', newsector)
    }
    editSector(editSectorData: ISector) {
        console.log("Изменение сектора");
        console.log(editSectorData)
        this.emit('edit-sector', editSectorData)
    }
    openAddModal() {
        console.log("Модал добавления"); 
        this.emit('open-modal', {action: ButtonActions.OPEN_ADD})
    }
    openEditModal(sector: ISector) {
        console.log("Модал редактирования");
        this.emit('open-modal', {action: ButtonActions.OPEN_EDIT, sector})
        console.log(sector)
    }
    trashSector(id:number) {
        console.log("Удаление сектора");
        this.emit('trash-sector', id)
    }
}