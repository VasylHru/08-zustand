"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function NoteDetailsClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !data) return <p>Error loading note</p>;

  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>{data.createdAt}</p>
    </>
  );
}
