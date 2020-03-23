export default class utilities {
  static findLanguageIndex(data, language) {
    let index = data.findIndex(item => item.language.id === language);
    if (index < 0) {
      index = 0;
    }
    return index;
  }
}
