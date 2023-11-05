/**
 * Livejournal and its forked derivatives (most notably dreamwidth)
 * supported a handful of custom tags.
 */

const patterns = {
  user: /<lj user=['"]?(\w*)['"]?[^>]*>/ig,
  cutWrapperWithText: /<lj-cut\s+text=['"]?([^'">]*)['"]?>(.+)<\/lj-cut>/ig, // <lj-cut text="cut text">Hidden content</lj-cut>
  cutWrapperNoText: /<lj-cut([^>]*)>(.+)<\/lj-cut>/ig,                       // <lj-cut>Hidden content</lj-cut>
  cutClosedWithText: /<lj-cut\s+text=['"]?([^'">]*)['"]?[^>]*><\/lj-cut>/ig, // <lj-cut text="cut text"></lj-cut>
  cutClosedNoText: /<lj-cut[^>]*><\/lj-cut>/ig,                              // <lj-cut></lj-cut>
  cutSelfClosingWithText: /<lj-cut\s+text=['"]?([^'">]*)['"][^>]*>/ig,       // <lj-cut text="cut text">
  cutSelfClosingNoText: /<lj-cut[^>]*>/ig,                                   // <lj-cut>
}

export function cutTeaser(html: string) {
  // Replace cutWrappers with a span; 
  // Replace cutClosed and cutSelfClosing span and a marker
  // Split on the marker, discard anything after it
}

// Removes lj-cut tags and any lj-cut text, producing a full post. 
export function cutBody(html: string) {
  // Replace cutWrappers with the wrapped text
  // Remove cutClosed and cutSelfClosing
}

/**
 * Description placeholder
 */
export function userToLink(html: string, replacement?: string) {
  replacement ??= `<a class="lj-user" href="https://livejournal.com/users/$1">$1</a>`;
  return html.replaceAll(patterns.user, replacement);
}
