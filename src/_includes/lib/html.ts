/*
 * HTML composition primitives.
 *
 * Nunjucks autoescaped every `{{ }}` and required an explicit `| safe` to opt
 * out of it. Template literals have no such default, so a direct port would
 * quietly drop that guarantee -- and change the bytes on every page whose
 * title or description contains `&` or an apostrophe.
 *
 * This rebuilds the guarantee the other way round: `html` escapes every
 * interpolated value unless it is already an `Html`, which is what `| safe`
 * used to mean. The escape map below is nunjucks' own, character for
 * character (see nunjucks/src/lib.js), so the rendered output is unchanged.
 */

const ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '"': '&quot;',
  "'": '&#39;',
  '<': '&lt;',
  '>': '&gt;',
  '\\': '&#92;',
};

const ESCAPE_PATTERN = /[&"'<>\\]/g;

export function escape(value: string): string {
  return value.replace(ESCAPE_PATTERN, (character) => ESCAPE_MAP[character] as string);
}

/**
 * Markup that is already safe to emit. Constructing one is the deliberate act
 * that `| safe` used to be, so every unescaped byte in the output is traceable
 * to a `raw()` or an `html` template here.
 */
export class Html {
  readonly #markup: string;

  constructor(markup: string) {
    this.#markup = markup;
  }

  toString(): string {
    return this.#markup;
  }
}

/**
 * Mark a string as pre-escaped markup.
 *
 * Also used for content strings carrying HTML entity references (`&mdash;`,
 * `&ndash;`, `&rsquo;`), which the Nunjucks templates wrote out literally.
 * They are kept as entities rather than swapped for the equivalent Unicode
 * characters so the port changes no rendered bytes; switching them to literal
 * Unicode later is a separate, deliberate edit.
 */
export function raw(markup: string): Html {
  return new Html(markup);
}

/** Anything an `html` template is allowed to interpolate. */
export type Renderable = Html | string | number | null | undefined | false | Renderable[];

function resolve(value: Renderable): string {
  if (value === null || value === undefined || value === false) return '';
  if (value instanceof Html) return value.toString();
  if (Array.isArray(value)) return value.map(resolve).join('');
  return escape(String(value));
}

/**
 * Tagged template for markup. Interpolated values are escaped; nested `html`
 * results and `raw()` values are not.
 */
export function html(strings: TemplateStringsArray, ...values: Renderable[]): Html {
  let output = strings[0] as string;
  for (let index = 0; index < values.length; index += 1) {
    output += resolve(values[index] as Renderable) + (strings[index + 1] as string);
  }
  return new Html(output);
}

/** Join rendered fragments with a separator, e.g. the newline between nav links. */
export function join(parts: Renderable[], separator = ''): Html {
  return new Html(parts.map(resolve).join(separator));
}
