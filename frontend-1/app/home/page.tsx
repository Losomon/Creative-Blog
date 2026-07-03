import { redirect } from "next/navigation";

// The homepage content lives at the root route (app/page.tsx). This folder
// exists to match the repo's expected route structure and simply forwards
// any visits to "/home" back to "/".
export default function HomeRedirect() {
  redirect("/");
}
