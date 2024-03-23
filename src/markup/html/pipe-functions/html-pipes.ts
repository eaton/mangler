import { CheerioPipeFunction, getScope } from './index.js';

export const outerHtml: CheerioPipeFunction = ({
  $scope,
  selector,
  opts,
  value,
}) => getScope($scope, selector, opts).toString();

export const html = outerHtml;
