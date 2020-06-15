export const truncate = (str, len) => {
  if( str.length > 0 && str.length > len) {
    let new_str = str + " ";
    new_str = str.substr(0, len);
    new_str = str.substr(0, new_str.lastIndexOf(" "));
    new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
    return new_str + '... ';
  }

  return str;
};

export const stripTags = (input) => {
  return input.replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/gi,'');
};

export const getHashtags = input => {
  const regex = /#[^ :\n\t\.,\?\/’'!]+/g;
  const hashtagsTemp = input.match(regex);

  if(!hashtagsTemp) return [];

  return hashtagsTemp.map(hastag => {
    let temp = hastag.replace(/[><]/, "");
    temp = temp.replace('&nbsp;', "");
    return temp.replace('#', '');
  })
}