import type { Metadata } from "next";
import css from "@/components/NoteFound/note-found.module.css";

export const metadata: Metadata = {
  title: "NoteHub — Page Not Found",
  description: "Page not found",
  openGraph: {
    title: "NoteHub — Page Not Found",
    description: "Page not found",
    url: "https://08-zustand-blush-seven.vercel.app",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const NotFound = () => {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
