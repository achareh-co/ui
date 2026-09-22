import { AcmeUIPlugin, createViteIntegrations, type AcmeUIOptions } from './unplugin'

export type { AcmeUIOptions }

export default function ui(options?: AcmeUIOptions): any[] {
  return [AcmeUIPlugin.vite(options ?? {}), ...createViteIntegrations(options)].flat(2)
}
