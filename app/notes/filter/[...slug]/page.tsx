import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import NotesFilterClient from "./NotesFilter.client";
import { notFound } from "next/navigation";

type PageProp = {
params: Promise<{ slug: string[] }>
};

export const generateMetadata = async ({
  params,
}: PageProp): Promise<Metadata> => {
  const { slug} = await params;
  const tagParam = slug?.[0];
  const normalizedTag = tagParam === "all" ? `All notes` : tagParam;

  return {
    title: `${normalizedTag}`,
    description: `Notes page filtered by tag ${normalizedTag}`,
    openGraph: {
      title: `${normalizedTag}`,
      description: `Notes page filtered by tag ${normalizedTag}`,
      url: `https://08-zustand-blush-seven.vercel.app/notes/filter/${tagParam}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub Page`,
        },
      ],
    },
  };
};

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
    queryKey: ["filteredNotes", normalizedTag],
    queryFn: () => fetchNotes(1, undefined, normalizedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesFilterClient tag={normalizedTag} />
    </HydrationBoundary>
  );
}
