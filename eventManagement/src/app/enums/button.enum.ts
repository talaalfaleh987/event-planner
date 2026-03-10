export enum ButtonType {
  SUBMIT,
  BUTTON,
  RESET,
}
export enum ButtonStyle {
  PRIMARY = `
    rounded-md bg-primary text-white p-3 w-full font-neo-medium
    hover:brightness-90
    transition-colors duration-200
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:brightness-100
  `,
  ICON = `flex items-center gap-1 text-primary text-lg cursor-pointer font-neo-medium`,
}
