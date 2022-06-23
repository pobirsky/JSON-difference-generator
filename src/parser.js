import yaml from 'js-yaml';

export default (content, extention) => {
  switch (extention) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`Invalid file extention: ${extention}! Change!`);
  }
};
