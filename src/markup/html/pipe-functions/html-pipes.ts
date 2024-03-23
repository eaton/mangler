import { CheerioPipeFunction, getScope } from './index.js';

export const outerHtml: CheerioPipeFunction = ({
  $scope,
  selector,
  opts,
  value,
}) => getScope($scope, selector, opts).toString();

export const contents: CheerioPipeFunction = ({
  $scope,
  selector,
  opts,
  value,
}) => getScope($scope, selector, opts).contents();

export const html = outerHtml;
