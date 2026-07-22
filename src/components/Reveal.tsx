"use client";

import type { ElementType, ComponentPropsWithoutRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type RevealOwnProps<T extends ElementType> = {
  as?: T;
  delay?: number;
};

type RevealProps<T extends ElementType> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  className,
  ...rest
}: RevealProps<T>) {
  const MotionTag = motion[(as ?? "div") as "div"];

  return (
    <MotionTag
      className={className ?? ""}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 2, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      {...(rest as HTMLMotionProps<"div">)}
    />
  );
}
