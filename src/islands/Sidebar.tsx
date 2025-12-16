import { Title } from "./generic/Title.tsx";
import { Link } from "./generic/Link.tsx";
import { LightDarkButton } from "./LightDarkButton.tsx";

const Sidebar = () => {
  return (
    <aside
      classList={{
        "text-sm flex flex-col gap-px": true,
        "*:w-full *:h-8 *:flex *:items-center *:gap-2 *:select-none *:rounded-md *:font-medium":
          true,
        "**:[svg]:h-5 **:[svg]:w-5 **:[svg]:text-neutral-500 dark:**:[svg]:text-neutral-400":
          true,
        "w-16 p-2 md:w-xs md:px-2 md:mr-2 **:[span]:hidden md:**:[span,h2]:inline":
          true,
      }}
    >
      <Link href="#">
        <i class="i-lucide:construction" />
        <span>Under Construction</span>
      </Link>

      <Title>
        <span>Collections</span>
      </Title>
      <Link href="#" active>
        <i class="i-lucide:library" />
        <span>Pages</span>
      </Link>
      <Link href="#">
        <i class="i-lucide:calendars" />
        <span>Posts</span>
      </Link>
      <Link href="#">
        <i class="i-lucide:mic" />
        <span>Sermons</span>
      </Link>
      <Link href="#">
        <i class="i-lucide:images" />
        <span>Media</span>
      </Link>

      <Title>
        <span>Settings</span>
      </Title>
      <Link href="#">
        <i class="i-lucide:signature" />
        <span>Metadata</span>
      </Link>
      <Link href="#">
        <i class="i-lucide:menu" />
        <span>Navigation</span>
      </Link>
      <Link href="#">
        <i class="i-lucide:link" />
        <span>Redirects</span>
      </Link>
      <Link href="#">
        <i class="i-lucide:users" />
        <span>Users</span>
      </Link>

      <Link href="#" class="mt-auto">
        <i class="i-lucide:circle-user" />
        <span>Username</span>
      </Link>
      <LightDarkButton />
      <Link href="#">
        <i class="i-lucide:logs" />
        <span>Audit Logs</span>
      </Link>
      <Link href="#">
        <i class="i-lucide:log-out" />
        <span>Sign Out</span>
      </Link>
    </aside>
  );
};

export { Sidebar };
