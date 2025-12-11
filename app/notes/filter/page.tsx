import { redirect } from "next/navigation";

export default function FilterRedirectPage() {
  redirect("/notes/filter/all");
}