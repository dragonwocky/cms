import { Moon, Sun } from "lucide-solid";
import { Button } from "./generic/Button.tsx";

const LightDarkButton = () => {
  return (
    <>
      <Button
        onClick={() => document.documentElement.classList.add("dark")}
        class="dark:hidden"
      >

        <Moon/>
        <span>Dark Mode</span>
      </Button>
      <Button
        onClick={() => document.documentElement.classList.remove("dark")}
        class="not-dark:hidden"
      >
        <Sun />
        <span>Light Mode</span>
      </Button>
    </>
  );
};

export { LightDarkButton };
