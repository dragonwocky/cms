import type { JSX } from "solid-js";

interface Props {
  class?: string;
  onClick?: JSX.EventHandlerUnion<
    HTMLButtonElement,
    MouseEvent,
    JSX.EventHandler<HTMLButtonElement, MouseEvent>
  >;
  children: number | boolean | Node | JSX.ArrayElement | string;
}

const Button = (props: Props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      classList={{
        "cursor-pointer px-3 py-1": true,
        "hover:bg-neutral-200 dark:hover:bg-neutral-600": true,
        "focus:bg-neutral-100 dark:focus:bg-neutral-700 ": true,
        "focus:text-neutral-900 dark:focus:text-neutral-50": true,
        "text-neutral-600 dark:text-neutral-300": true,
        [props.class]: true,
      }}
    >
      {props.children}
    </button>
  );
};

export { Button };
