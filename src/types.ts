export enum ButtonActions {
  ADD = "add",
  EDIT = "edit",
  OPEN_ADD = "open_add",
  OPEN_EDIT = "open_edit",
  TRASH = "trash",
}

export enum InputActions {
  NAME,
  VALUE,
  COLOR
}

export enum ThemesLoader {
  DASHBOARD = "dashboard",
  DEFAULT = "default"
}

export type ButtonActionsType = (typeof ButtonActions)[keyof typeof ButtonActions]
export type InputActionsType = (typeof InputActions)[keyof typeof InputActions]
export type TypesThemesLoader = (typeof ThemesLoader)[keyof typeof ThemesLoader]

export type TOpenModalFunc = (data: {action: ButtonActions.OPEN_ADD | ButtonActions.OPEN_EDIT, sector?: ISector}) => void
export type TTrashFunc = (action: number) => void

export interface ISector {
  id: number
  name: string
  value: number
  color: string
}

export interface IModalParams extends ISector {
  type: ButtonActions.OPEN_ADD | ButtonActions.OPEN_EDIT
}
