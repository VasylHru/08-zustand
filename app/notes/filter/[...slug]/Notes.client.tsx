"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes } from "@/lib/api";
import Link from "next/link";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "@/components/NotesPage/NotesPage.module.css";


type NotesClientProps = {
   tag?: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search,500);

 const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes",tag, page, debouncedSearch],
    queryFn: () => fetchNotes(page,tag,debouncedSearch),
    placeholderData: (prev) => prev,
  }); 

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            pageCount={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <div className={css.sidebar}></div>
        <Link href="/notes/action/create">
          <button className={css.button}>Create note +</button>
        </Link>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={(error as Error).message} />}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
