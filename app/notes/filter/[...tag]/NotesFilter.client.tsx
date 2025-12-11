"use client";

import NoteList from "@/components/NoteList/NoteList";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

type NotesFilterClientProps = {
  tag?: string;
};

export default function NotesFilterClient({ tag }: NotesFilterClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["filteredNotes", tag],
    queryFn: () => fetchNotes(1, undefined, tag),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !data) return <p>Oops...Something went wrong.</p>;

  return <NoteList notes={data.notes} />;
}
