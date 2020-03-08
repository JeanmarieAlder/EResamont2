export class utilities {
  static findLanguageIndex(data, language) {
    let index = data.findIndex(item => item.language.id === language);
    return index;
  }
}

export default utilities;
// "splash": {
//   "image": "./assets/images/splash.png",
//   "resizeMode": "contain",
//   "backgroundColor": "#ffffff"
// },
