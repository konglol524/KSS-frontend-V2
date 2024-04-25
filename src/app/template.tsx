import Transition from "@/components/Transition";
export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Transition>{children}</Transition>;
}
