import {
  Calendars,
  CircleUser,
  Construction,
  Images,
  Library,
  LinkIcon,
  LogOut,
  Logs,
  Menu,
  Mic,
  Signature,
  Users,
} from "lucide-solid";
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
        "w-16 mr-2 md:w-xs md:px-2 md:mr-8 **:[span]:hidden md:**:[span,h2]:inline": true
      }}
    >
      <Link href="#">
        <Construction />
        <span>Under Construction</span>
      </Link>

      <Title><span>Collections</span></Title>
      <Link href="#" active>
        <Library />
        <span>Pages</span>
      </Link>
      <Link href="#">
        <Calendars />
        <span>Posts</span>
      </Link>
      <Link href="#">
        <Mic />
        <span>Sermons</span>
      </Link>
      <Link href="#">
        <Images />
        <span>Media</span>
      </Link>

      <Title><span>Settings</span></Title>
      <Link href="#">
        <Signature />
        <span>Metadata</span>
      </Link>
      <Link href="#">
        <Menu />
        <span>Navigation</span>
      </Link>
      <Link href="#">
        <LinkIcon />
        <span>Redirects</span>
      </Link>
      <Link href="#">
        <Users />
        <span>Users</span>
      </Link>

      <Link href="#" class="mt-auto">
        <CircleUser />
        <span>Username</span>
      </Link>
      <LightDarkButton />
      <Link href="#">
        <Logs />
        <span>Audit Logs</span>
      </Link>
      <Link href="#">
        <LogOut />
        <span>Sign Out</span>
      </Link>
    </aside>
  );
};

export { Sidebar };
