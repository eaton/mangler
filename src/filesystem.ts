import jetpack from 'fs-jetpack';

/**
 * An extremely lightweight wrapper for the fs-jetpack library.
 *
 * May be adding some extras to it over time — particularly, configurable file format
 * helpers that would allow `read()` and `write()` to handle things other than JSON
 * automatically. JSONC, NDJSON, JSON5, CSV, TSV, and YAML are the prime candidates
 * for convenience wrappers.
 *
 * For now, though, jetpack's the way to go.
 */
export const fs = jetpack;
