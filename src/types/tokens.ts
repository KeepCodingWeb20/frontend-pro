/**
 * Tokens de diseño TIPADOS. TS READY
 * Evitar typo erros
 */
// Verificar carga forzada de colores
export type ColorToken =
  | 'color-gryffindor'
  | 'color-slytherin'
  | 'color-ravenclaw'
  | 'color-hufflepuff'
  | 'color-bg'
  | 'color-fg'
  | 'color-muted';

export type SpacingToken =
  | 'space-xs'
  | 'space-sm'
  | 'space-md'
  | 'space-lg'
  | 'space-xl';

export function getCSSVar(token: ColorToken | SpacingToken): string {
  return `var(--${token})`;
}
