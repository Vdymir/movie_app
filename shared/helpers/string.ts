export const truncateString = (
  children: React.ReactNode,
  trunk: number
): string => {
  if (!children) return "";
  const count = children.toString().length;
  const dot = count > trunk ? "..." : "";
  return children.toString().substring(0, trunk) + dot;
};
