import type { ElementType, ComponentPropsWithoutRef } from "react";

type RevealOwnProps<T extends ElementType> = {
  as?: T;
  delay?: number;
};

type RevealProps<T extends ElementType> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

// Scroll-triggered fade-in animation disabled — it could leave content
// stuck invisible after back-navigation. Kept as a passthrough so call
// sites don't need to change.
export function Reveal<T extends ElementType = "div">({
  as,
  delay: _delay,
  className,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const props = { className: className ?? "", ...rest } as ComponentPropsWithoutRef<T>;
  return <Tag {...props} />;
}
