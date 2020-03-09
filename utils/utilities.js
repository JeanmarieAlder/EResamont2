export class utilities {
  static findLanguageIndex(data, language) {
    let index = data.findIndex(item => item.language.id === language);
    return index;
  }
}

export default utilities;
