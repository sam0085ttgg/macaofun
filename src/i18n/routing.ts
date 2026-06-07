import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['zh-TW', 'en', 'zh-CN'],
  defaultLocale: 'zh-TW',
  localePrefix: 'always',
})
