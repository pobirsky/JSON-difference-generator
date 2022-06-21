import yaml from 'js-yaml';

export default (filecontent, extention) => {
  switch (extention) {
    case 'json':
      return JSON.parse(filecontent);
    case 'yml':
    case 'yaml':
      return yaml.load(filecontent);
    default:
      throw new Error(`Invalid file extention: ${extention}! Change!`);
  }
};
