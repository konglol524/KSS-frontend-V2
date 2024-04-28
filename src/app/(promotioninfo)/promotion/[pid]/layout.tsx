import LoaderLayout from "@/components/LoaderLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LoaderLayout>{children}</LoaderLayout>;
}
