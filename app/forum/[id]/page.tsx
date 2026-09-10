// app/forum/[id]/page.tsx
import { SEED_TOPICS } from "@/app/home/forumData";
import ForumTopicView from "@/app/home/ForumTopicView";

export function generateStaticParams() {
  return SEED_TOPICS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const topic = SEED_TOPICS.find((t) => t.id === id);
  return {
    title: topic ? `${topic.title} — Forum` : "Topic — Forum",
    description: topic?.preview ?? "Join the conversation.",
  };
}

export default async function ForumTopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ForumTopicView topicId={id} />;
}
