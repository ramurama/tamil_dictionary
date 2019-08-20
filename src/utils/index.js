import _ from 'underscore';

export const removeElement = (array, element) =>
  _.without(array, _.findWhere(array, element));

export const removeElementInteger = (array, element) =>
  array.filter(ele => ele != element);

export const isEqual = (obj1, obj2) => _.isEqual(obj1, obj2);

export const isNullOrEmpty = obj => _.isNull(obj) || _.isEmpty(obj);
