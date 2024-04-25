import Link from "next/link";

export default function TopMenuItem({
  item,
  pageRef,
  customClasses,
}: {
  item: any;
  pageRef: string;
  customClasses?: string;
}) {
  return (
    <Link
      href={pageRef}
      className={customClasses}
      draggable={false}
      prefetch={true}
    >
      {item}
    </Link>
  );
}
