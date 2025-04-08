import {
  getCollection,
  type AnyEntryMap,
  type CollectionEntry,
  type RenderedContent,
} from "astro:content";

/**
 * 计算字符串中单词个数与汉字个数之和
 */
export const getWordCount = (text: string) => {
  const cnChars = text.match(/[\u4e00-\u9fff]/g) || []; // 汉字
  const enWords = text.match(/\b[a-zA-Z'-]+\b/g) || []; // 英文单词
  return cnChars.length + enWords.length;
};

/**
 * 获取指定名称集合，并根据日期倒序排列（我服了这类型系统)
 */
export const getCollectionOrderByDate = async <C extends keyof AnyEntryMap>(
  collection: C,
  filter?: (entry: CollectionEntry<C>) => unknown
): Promise<CollectionEntry<C>[]> => {
  const cs:CollectionEntry<C>[] = filter
    ? await getCollection(collection, filter)
    : await getCollection(collection);
  cs.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
  return cs;
};
