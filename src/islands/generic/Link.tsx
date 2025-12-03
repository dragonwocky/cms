import type { JSX } from "solid-js";

interface Props {
  href: string;
  class?: string;
  active?: boolean;
  children: number | boolean | Node | JSX.ArrayElement | string;
}

const Link = (props: Props) => {
  return (
    <a
      href={props.href}
      classList={{
        "cursor-pointer px-3 py-1": true,
        "hover:bg-neutral-200 dark:hover:bg-neutral-600": true,
        "focus:bg-neutral-100 dark:focus:bg-neutral-700 ": true,
        "focus:text-neutral-900 dark:focus:text-neutral-50": true,
        "text-neutral-600 dark:text-neutral-300": !props.active,
        "bg-neutral-100 dark:bg-neutral-700 ": props.active,
        "text-neutral-900 dark:text-neutral-50": props.active,
        [props.class]: true,
      }}
    >
      {props.children}
    </a>
  );
};

export { Link };
