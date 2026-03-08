export enum ButtonType {
  SUBMIT,
  BUTTON,
  RESET,
}
export enum ButtonStyle {
  PRIMARY = `
    rounded-md bg-primary text-white p-3 w-full
    hover:brightness-90
    transition-colors duration-200
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:brightness-100
  `,
}
