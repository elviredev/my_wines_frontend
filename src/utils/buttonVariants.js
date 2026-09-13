export const buttonVariants = {
  primary: `
    bg-linear-to-r from-rose-700/90 to-red-900/90
    hover:from-rose-800 hover:to-red-900 hover:shadow-none
    text-white
    shadow-md shadow-rose-900/20
  `,

  notshadow: `
    bg-linear-to-r from-rose-700/90 to-red-900/90
    hover:from-rose-800 hover:to-red-900 hover:shadow-md hover:shadow-rose-900/20
    text-white    
  `,

  secondary: `
    bg-white
    text-rose-700
    hover:bg-rose-50
    shadow-md
  `,

  outline: `
    border border-white/20
    bg-white/10
    text-white
    hover:bg-white/20
    backdrop-blur
  `,

  danger: `
    bg-red-600
    text-white
    hover:bg-red-700
    shadow-md
  `,
}