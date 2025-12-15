"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";




export default function NoteDetailsClient({ id }: { id: string }) {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !data) return <p>Error loading note</p>;

  
  const handleGoBack = () => {
    const isSure = confirm("Are you sure?");
    if (isSure) {
      router.back();
    }
  };
  return (
    <>
      <button onClick={handleGoBack}>Back</button>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>{data.createdAt}</p>
    </>
  );
}
