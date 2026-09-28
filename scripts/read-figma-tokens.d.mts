export function jsonPath(defaultRelative: string, argv?: string[]): string
export function readTokens(filePath: string): any
export function numericEntries(rootNode: any, segments: string[]): Array<[string, number]>
export function stringToken(rootNode: any, segments: string[]): string
export function sortSpacing<T>(entries: Array<[string, T]>): Array<[string, T]>
export function quote(value: unknown): string
export function replaceExportedArray(source: string, name: string, rowLines: string[]): string
export function replaceExportedString(source: string, name: string, value: string): string
export function repoFile(relativePath: string): string
