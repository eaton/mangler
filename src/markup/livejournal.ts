/**
 * Livejournal and its forked derivatives (most notably dreamwidth)
 * supported a handful of custom tags.
 */

const patterns = {
  user: /<lj user=['"]?(\w*)['"]?[^>]*>/ig,
  cutWrapper: /<lj-cut\s+text=['"]?([^'">]*)['"]?>(.+)<\/lj-cut>/ig, // <lj-cut text="cut text">Hidden content</lj-cut>
  cutWrapperNoText: /<lj-cut[^>]*>(.+)<\/lj-cut>/ig,                       // <lj-cut>Hidden content</lj-cut>
  cutClosed: /<lj-cut\s+text=['"]?([^'">]*)['"]?[^>]*><\/lj-cut>/ig, // <lj-cut text="cut text"></lj-cut>
  cutClosedNoText: /<lj-cut[^>]*><\/lj-cut>/ig,                              // <lj-cut></lj-cut>
  cutSelfClosing: /<lj-cut\s+text=['"]?([^'">]*)['"]?[^>]*>/ig,       // <lj-cut text="cut text">
  cutSelfClosingNoText: /<lj-cut[^>]*>/ig,                                   // <lj-cut>
}

/**
 * Generate an entry teaser from an entry with lj-cut tags.
 */
export function cutTeaser(html: string) {
  const wrapperReplacement = '<span class="lj-cut">$1</span>';
  const wrapperNoTextReplacement = '<span class="lj-cut"></span>';
  const placeholder = '\ufeff';

  return html
    .replace(patterns.cutWrapper, wrapperReplacement)                          // Replace wrapper with text
    .replace(patterns.cutWrapperNoText, wrapperNoTextReplacement)                          // Replace wrapper with text
    .replace(patterns.cutSelfClosing, wrapperReplacement + placeholder)                // Replace breaker with placeholder
    .replace(patterns.cutClosedNoText, placeholder) // Replace annotated breaker with text & placeholder
    .replace(patterns.cutClosed, wrapperReplacement + placeholder)      // Replace annotated breaker with text & placeholder
    .replace(patterns.cutSelfClosingNoText, placeholder)                // Replace breaker with placeholder
    .split(placeholder)[0];                                             // Discard post-placeholder text
}

/**
 * Generate an full post body from an entry with lj-cut tags.
 */
export function cutBody(html: string) {
  const wrapperReplacement = '<span class="lj-uncut">$1</span>';

  return html
    .replace(patterns.cutWrapperNoText, wrapperReplacement) // Remove cut wrapper
    .replace(patterns.cutClosedNoText, '')                  // Remove cut breaker
    .replace(patterns.cutSelfClosingNoText, '');            // Remove cut breaker
}

/**
 * Replace `<lj user="username" />` tags with classed a tags.
 */
export function userToLink(html: string, replacement?: string) {
  replacement ??= `<a class="lj-user" href="https://livejournal.com/users/$1">$1</a>`;
  return html.replaceAll(patterns.user, replacement);
}
