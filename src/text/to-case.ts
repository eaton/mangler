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

// Inefficient but amusing
export function random(input: string) {
  let output = '';
  for (const c of input) {
    output +=
      Math.round(Math.random()) === 1
        ? c.toLocaleLowerCase()
        : c.toLocaleUpperCase();
  }
  return output;
}
