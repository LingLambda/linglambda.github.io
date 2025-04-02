/**
 * 计算字符串中单词个数与汉字个数之和
 */
export const getCount = (text: string) => {
  const cnChars = text.match(/[\u4e00-\u9fff]/g) || []; // 汉字
  const enWords = text.match(/\b[a-zA-Z'-]+\b/g) || []; // 英文单词
  return cnChars.length + enWords.length;
};
