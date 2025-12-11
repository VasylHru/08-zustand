import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesFilterClient from "./NotesFilter.client";

export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ tag: string[] }>;
}) {
  const queryClient = new QueryClient();

  const { tag } = await params;

  const tagParam = tag?.[0];
  const normalizedTag = tagParam === "all" ? undefined : tagParam;

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
