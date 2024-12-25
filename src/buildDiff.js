import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _([...Object.keys(data1), ...Object.keys(data2)]).uniq().sortBy().value();

  return keys.map((key) => {
    if (!(key in data2)) {
      return { key, type: 'removed', value: data1[key] };
    }

    if (!(key in data1)) {
      return { key, type: 'added', value: data2[key] };
    }

    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) };
    }

    if (!(_.isEqual(value1, value2))) {
      return {
        key, type: 'changed', value1, value2,
      };
    }

    return { key, type: 'equal', value: value1 };
  });
};

export default buildDiff;
