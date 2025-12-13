// "use client";

// import { useRouter } from "next/navigation";
// import css from "./NoteForm.module.css";
// import { createNote } from "@/lib/api";
// import type { NoteTag } from "@/types/note";
// import { useNoteStore } from "@/lib/store/noteStore";

// const NoteForm = () => {
//   const router = useRouter();

// const { draft, setDraft, clearDraft } = useNoteStore();

//   const action = async (formData: FormData) => {
//     const title = formData.get("title") as string;
//     const content = formData.get("content") as string;
//     const tag = formData.get("tag") as NoteTag;

//     await createNote({ title, content, tag });
//         router.push("/notes");

//   };

//   return (
//     <form className={css.form} action={action}>
//       <div className={css.formGroup}>
//         <label htmlFor="title">Title</label>
//         <input
//           id="title"
//           name="title"
//           minLength={3}
//           maxLength={50}
//           required
//           className={css.input}
//         />
//       </div>

//       <div className={css.formGroup}>
//         <label htmlFor="content">Content</label>
//         <textarea
//           id="content"
//           name="content"
//           rows={8}
//           maxLength={500}
//           className={css.textarea}
//         />
//       </div>

//       <div className={css.formGroup}>
//         <label htmlFor="tag">Tag</label>
//         <select
//           id="tag"
//           name="tag"
//           defaultValue="Todo"
//           className={css.select}
//         >
//           <option value="Todo">Todo</option>
//           <option value="Work">Work</option>
//           <option value="Personal">Personal</option>
//           <option value="Meeting">Meeting</option>
//           <option value="Shopping">Shopping</option>
//         </select>
//       </div>

//       <div className={css.actions}>
//         <button type="submit" className={css.submitButton}>
//           Create note
//         </button>
//       </div>
//     </form>
//   );
// };

// export default NoteForm;
"use client";

import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";

const NoteForm = () => {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "tag") {
      setDraft({ tag: value as NoteTag });
      return;
    }

    if (name === "title") setDraft({ title: value });
    if (name === "content") setDraft({ content: value });
  };

  const action = async (formData: FormData) => {
    const title = (formData.get("title") as string) ?? "";
    const content = (formData.get("content") as string) ?? "";
    const tag = ((formData.get("tag") as string) ?? "Todo") as NoteTag;

    await createNote({ title, content, tag });

    clearDraft();
    router.back();
  };

  return (
    <form className={css.form} action={action}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={draft.title}
          onChange={handleChange}
          minLength={3}
          maxLength={50}
          required
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={draft.content}
          onChange={handleChange}
          rows={8}
          maxLength={500}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>

        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
