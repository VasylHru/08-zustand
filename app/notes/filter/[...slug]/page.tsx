import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string[] }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const url = slug.join('/');
  const tagName = slug[slug.length - 1];

  return {
    title: ` ${tagName}`,
    description: `Page with selected filters: ${url}`,
    openGraph: {
      title: `Notes: ${tagName}`,
      description: `Page with selected filters: ${url}`,
      url: `https://notehub.com/notes/filter/${url}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes: ${tagName}`,
        },
      ],
      type: 'article',
    },
  };
}

export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const VALID_TAGS = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];
  const tagParam = slug?.[0];
  const normalizedTag = tagParam === "all" ? undefined : tagParam;

  if (!VALID_TAGS.includes(tagParam)) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ["notes", normalizedTag, 1, ""],
    queryFn: () => fetchNotes(1, normalizedTag, ""),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={normalizedTag} />
    </HydrationBoundary>
  );
}
