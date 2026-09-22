import { AcharehUIPlugin, createViteIntegrations, type AcharehUIOptions } from './unplugin'

export type { AcharehUIOptions }

export default function ui(options?: AcharehUIOptions): any[] {
  return [AcharehUIPlugin.vite(options ?? {}), ...createViteIntegrations(options)].flat(2)
}
