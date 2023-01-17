import { IoLogoGithub } from "react-icons/io5";
import Logo from "../components/Logo";

import Root from "../components/Root";

export default function Login() {
    return (
        <Root>
            <main className="grid place-items-center h-screen w-screen bg-slate-200">
                <div>
                    <Logo />
                    <a
                        className="text-center cursor-pointer bg-slate-800 text-white py-2 px-6 w-full mt-5 rounded-md flex items-center justify-center relative"
                        href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scopes=repo,user`}
                    >
                        <IoLogoGithub className="text-xl absolute left-3" />
                        <span>Sign in with GitHub</span>
                    </a>
                </div>
            </main>
        </Root>
    );
}
