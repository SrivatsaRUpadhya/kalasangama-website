import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Dropzone from "~/components/Dropzone";
import { CreateTeamDialog } from "~/components/Forms/CreateTeam";
import { api } from "~/utils/api";
import { useState } from "react";
export default function Home() {
	const [files, setFiles] = useState<File[]>([]);

	const hello = api.example.hello.useQuery({ text: "from tRPC" });
	const addCollege = api.college.register.useMutation();
	return (
		<>
			<Head>
				<title>Create T3 App</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className=" flex min-h-screen flex-col items-center justify-center ">
				<div className="flex flex-col items-center gap-2">
					<p className="text-2xl ">
						{hello.data
							? hello.data.greeting
							: "Loading tRPC query..."}
					</p>
					<button onClick={() => addCollege.mutate({ name: "test" })}>
						add college
					</button>
					<CreateTeamDialog />
					<Dropzone files={files} setFiles={setFiles} />
					<AuthShowcase />
				</div>
			</main>
		</>
	);
}

function AuthShowcase() {
	const { data: sessionData } = useSession();
	const createTeam = api.team.register.useMutation();
	const { data: secretMessage } = api.example.getSecretMessage.useQuery(
		undefined, // no input
		{ enabled: sessionData?.user !== undefined }
	);

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<p className="text-center text-2xl ">
				{sessionData && (
					<span>Logged in as {sessionData.user?.name}</span>
				)}
				{secretMessage && <span> - {secretMessage}</span>}
			</p>

			{sessionData && (
				<button
					onClick={() =>
						createTeam.mutate({
							college_id: "clmvm9how0004x93tht0gemlt",
							members: [
								{
									password: "Test@123",
									name: "menber",
									email: "test0@gmail.com",
									character_id: "cln321uw60000x9ylk0drlfq6",
									phone: "9449414199",
									id_url: "http://res.cloudinary.com/dh1bowbbe/image/upload/v1696092518/next/wubnfxkvpzr92plhorbg.png"
								},
								{
									password: "Test@123",
									name: "menber",
									email: "test1@gmail.com",
									character_id: "cln321uw60000x9ylk0drlfq6",
									phone: "9449414199",
									id_url: "http://res.cloudinary.com/dh1bowbbe/image/upload/v1696092518/next/wubnfxkvpzr92plhorbg.png"
								},
							],
						})
					}
				>
					Create Team
				</button>
			)}
			<button
				className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
				onClick={
					sessionData ? () => void signOut() : () => void signIn()
				}
			>
				{sessionData ? "Sign out" : "Sign in"}
			</button>
		</div>
	);
}
