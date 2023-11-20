/**
 * A collection of utility libraries for data parsing, manipulation, and conversion
 * with somewhat-opiionated consistency wrappers. 
 * 
 * @remarks
 * Mangler is meant to speed the process of large-scale migration and import projects,
 * where working with many different types of incoming data can be frustrating to to
 * the inconsistencies between the tools needed to deal with each one.
 * 
 * If you're interested in just one or two of its helper functions, you should absolutely
 * check out the underlying libraries it wraps: they'll be a much more efficient way to
 * get exactly what you need. 
 * 
 * @packageDocumentation
 */

export * as Text from './text/index.js';
export * as Ids from './ids/index.js';
export * as Dates from './dates/index.js';
export * as Urls from './urls/index.js';

export * from './files/index.js';
export * from './markup/index.js';
export * from './files/formats/index.js';
