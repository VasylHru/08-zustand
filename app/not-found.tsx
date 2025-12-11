
import type { Metadata } from 'next';
import css from "@/components/NoteFound/note-found.module.css";

export const metadata: Metadata = {
  title: 'Error',
  description: 'Error message',
  openGraph: {
    title: "NoteHub Error",
    description: "This page does not exist",
    images: [
      {
        url: " https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Open Graph Image",
      },
    ],
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
