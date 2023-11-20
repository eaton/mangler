/**
  * Normalize text into various forms
  * 
  * - original: A normal string of text. some MIGHT be Capitalized.
  * - camel:    aNormalStringOfTextSomeMightBeCapitalized
  * - capital:  A Normal String Of Text Some Might Be Capitalized
  * - constant: A_NORMAL_STRING_OF_TEXT_SOME_MIGHT_BE_CAPITALIZED
  * - dot:      a.normal.string.of.text.some.might.be.capitalized
  * - first:     A normal string of text. some MIGHT be Capitalized.
  * - header:   A-Normal-String-Of-Text-Some-Might-Be-Capitalized
  * - kabob:    a-normal-string-of-text-some-might-be-capitalized
  * - kebab:    a-normal-string-of-text-some-might-be-capitalized
  * - lower:    a normal string of text. some might be capitalized.
  * - none:     a normal string of text some might be capitalized
  * - pascal:   ANormalStringOfTextSomeMightBeCapitalized
  * - path:     a/normal/string/of/text/some/might/be/capitalized
  * - random:   A nOrmal StrinG of TexT. SoMe mIghT bE CAPITalizED.
  * - sentence: A normal string of text some might be capitalized
  * - snake:    a_normal_string_of_text_some_might_be_capitalized
  * - swap:     a NORMAL STRING OF TEXT. SOME might BE cAPITALIZED.
  * - title:    A Normal String of Text. some MIGHT Be Capitalized.
  * - upper:    A NORMAL STRING OF TEXT. SOME MIGHT BE CAPITALIZED.
  */

export {
  camelCase as camel,
  pascalCase as pascal,
  capitalCase as capital,
  headerCase as header,
  titleCase as title,
  pathCase as path,
  snakeCase as snake,
  paramCase as kabob,
  paramCase as kebab,
  dotCase as dot,
  noCase as none,
  constantCase as constant,
  lowerCase as lower,
  upperCase as upper,
  upperCaseFirst as first,
  swapCase as swap,
  sentenceCase as sentence,
} from 'text-case';

export function random(input: string) {
  return input.split('')
    .map(c => Math.round(Math.random()) === 1
      ? c.toLocaleLowerCase()
      : c.toLocaleUpperCase())
    .join('')
}
