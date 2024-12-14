export const cleanText = (string: string) => {
  const patterns = [
    /(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g,
    /(ì|í|ị|ỉ|ĩ)/g,
    /(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g,
    /(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g,
    /(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g,
    /(ỳ|ý|ỵ|ỷ|ỹ)/g,
    /(đ)/g,
    /æ/g,
    /ç/gi,
    /ñ/gi,
    /%/gi,
    /[^\x00-\x7F]+/gi,
    /[^\w_ \-]+/gi,
    /^-|-$|/gi,
    /-+$/gi,
    / {2,}/g,
  ]
  const replace = ['a', 'i', 'u', 'e', 'o', 'y', 'd', 'ae', 'c', 'n', ' ', ' ', '', '', ' ']

  for (let i = 0; i < patterns.length; i++) {
    string = string.replace(patterns[i], replace[i])
  }

  return string
}
