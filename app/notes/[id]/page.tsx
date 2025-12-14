import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type PageProp = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: PageProp): Promise<Metadata> => {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: note.title,
    description: `Discription for Notes #${note.id}`,
    openGraph: {
      title: note.title,
      description: `Description for Note #${note.id}`,
      url: `https://08-zustand-blush-seven.vercel.app/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
};

export default async function NoteDetailsPage({ params }: PageProp) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
