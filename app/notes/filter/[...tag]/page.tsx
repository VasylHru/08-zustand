import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesFilterClient from "./NotesFilter.client";
import { notFound } from "next/navigation";






export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ tag: string[] }>;
}) {
  const queryClient = new QueryClient();

  const { tag } = await params;

  const VALID_TAGS = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];
  const tagParam = tag?.[0];
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
