import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes | NoteHub",
  description: "Browse and manage your notes",
};




import { fetchNotes } from "@/lib/api";
import NotesClient from "./filter/[...slug]/Notes.client";
export default async function NotesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes(1, ""),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
