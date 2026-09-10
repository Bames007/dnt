import { notFound } from "next/navigation";
import { articlesData } from "@/app/home/articlesData";
import ArticleViewPage from "@/app/home/articleViewPage";

export function generateStaticParams() {
  return articlesData.map((a) => ({ id: a.id }));
}

export default async function ArticleRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = articlesData.findIndex((a) => a.id === id);

  if (index === -1) notFound();

  const article = articlesData[index];
  const prevArticle = index > 0 ? articlesData[index - 1] : null;
  const nextArticle =
    index < articlesData.length - 1 ? articlesData[index + 1] : null;

  return (
    <ArticleViewPage
      article={article}
      prevArticle={prevArticle}
      nextArticle={nextArticle}
    />
  );
}
