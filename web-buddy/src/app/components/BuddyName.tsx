// Tool names are joined PascalCase (e.g. "ProcrastinationBuddy") with no
// space, so browsers have no natural wrap point. This adds one before
// "Buddy" for headings that render the name alone in a narrow container.
export default function BuddyName({ name }: { name: string }) {
  const splitAt = name.length - "Buddy".length;
  if (!name.endsWith("Buddy") || splitAt <= 0) return <>{name}</>;

  return (
    <>
      {name.slice(0, splitAt)}
      <wbr />
      Buddy
    </>
  );
}
