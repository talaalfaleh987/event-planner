export enum TagType {
  EDUCATIONAL = 'educational',
  ENTERTAINMENT = 'entertainment',
  WORK = 'work',
  OTHER = 'other'
}

export enum TagStyle {
  PRIMARY = 'text-md font-medium relative inline-block px-2 z-10 before:content-[""] before:block before:absolute before:inset-x-0 before:top-[52%] before:-translate-y-1/2 before:h-3 before:z-[-1]',
  EDUCATIONAL = 'text-green-500 before:bg-green-400',
  WORK = 'text-orange-200 before:bg-orange-100',
  ENTERTAINMENT = 'text-purple-200 before:bg-purple-100',
  OTHER = 'text-pink-200 before:bg-pink-100',
}

