import { IoLogoGithub } from "react-icons/io5";

import Logo from "../components/Logo";
import Root from "../components/Root";

export default function Login() {
  return (
    <Root>
      <main className="grid place-items-center h-screen w-screen bg-slate-200">
        <div className="flex flex-col gap-4">
          <Logo />
          <a
            className="text-center cursor-pointer bg-slate-800 hover:bg-slate-700 transition-colors text-white py-2 px-6 w-full rounded-lg flex items-center gap-2 justify-center relative"
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scopes=repo,user`}
          >
            <IoLogoGithub className="text-xl" />
            <span>Continue with GitHub</span>
          </a>
        </div>
      </main>
    </Root>
  );
}
