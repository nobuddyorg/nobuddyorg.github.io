export default function BuddyName({ name }: { name: string }) {
  const splitAt = name.length - "Buddy".length;
  if (!name.endsWith("Buddy") || splitAt <= 0) return <>{name}</>;

  return (
    <>
      {name.slice(0, splitAt)}
      {"​"}
      Buddy
    </>
  );
}
