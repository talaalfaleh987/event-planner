export enum ButtonType {
  SUBMIT,
  BUTTON,
  RESET,
}
export enum ButtonStyle {
  PRIMARY = `
    rounded-md bg-primary-normal text-white p-3 w-full font-neo-medium
    hover:brightness-90
    transition-colors duration-200
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:brightness-100
  `,
  ICON = `flex gap-1 text-lg cursor-pointer font-neo-regular`,
  WHITE_ICON = ICON + ' text-white fill-white absolute top-6 end-6',
  PRIMARY_ICON = ICON + ' text-primary fill-primary',
  VIEW = `bg-gray-200 rounded-md p-3 flex`,
  ICON_BUTTON_SM = `flex h-5 w-5 items-center justify-center`,
}
