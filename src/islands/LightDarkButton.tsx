import { Button } from "./generic/Button.tsx";

const LightDarkButton = () => {
  return (
    <>
      <Button
        onClick={() => document.documentElement.classList.add("dark")}
        class="dark:hidden"
      >
        <i class="i-lucide:moon" />
        <span>Dark Mode</span>
      </Button>
      <Button
        onClick={() => document.documentElement.classList.remove("dark")}
        class="hidden dark:flex"
      >
        <i class="i-lucide:sun" />
        <span>Light Mode</span>
      </Button>
    </>
  );
};

export { LightDarkButton };
