import { redirect } from "next/navigation";

/** Legacy index — subjects now have dedicated pages under /subjects/[id] */
export default function LessonsIndexPage() {
  redirect("/subjects");
}
