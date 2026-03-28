import rss from "@astrojs/rss";
import { getCollectionOrderByDate, titleToPinyin } from "../utils/utils.ts";

export async function GET(context: any) {
  const blogs = await getCollectionOrderByDate(
    "blog",
    ({ data }) => data.published === true
  );
  return rss({
    // 输出的 xml 中的`<title>`字段
    title: "Ling的小窝",
    // 输出的 xml 中的`<description>`字段
    description:
      "欢迎来到我的小窝！我会在这里放一些编程学习记录和生活随笔，欢迎留下你的评论和友链！",
    // 从端点上下文获取项目“site”
    // https://docs.astro.build/zh-cn/reference/api-reference/#site
    site: context.site,
    // 输出的 xml 中的`<item>`数组
    items: blogs.map((post) => ({
      title: post.data.title,
      date: post.data.date,
      description: post.data.description,
      // 从 `id` 属性计算出 RSS 链接
      link: `/blog/${titleToPinyin(post.data.title)}/`,
    })),
    // (可选) 注入自定义 xml
    customData: `<language>zh-cn</language>`,
  });
}
