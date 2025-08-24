import { redirect } from "next/navigation";

export default  function RootPage(): Promise<void> {
  redirect(`/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}`);
}
