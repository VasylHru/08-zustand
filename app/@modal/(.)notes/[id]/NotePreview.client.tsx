"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import css from "@/components/NotePreview/NotePreview.module.css"

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading…</p>;
  if (isError || !data) return <p>Error loading note</p>;

  return (
    <div className={css.modalContent}>
  <button className={css.closeButton} onClick={() => router.back()}>
    ✕
  </button>

  <h2 className={css.title}>{data.title}</h2>

  <p className={css.text}>{data.content}</p>

  <p className={css.meta}>
    Tag: <span className={css.tag}>{data.tag}</span>
  </p>

  <p className={css.meta}>
    Created: {new Date(data.createdAt).toLocaleDateString()}
  </p>
</div>
  );
}
