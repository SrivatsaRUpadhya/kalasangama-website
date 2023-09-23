import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { CreateTeamDialog } from "~/components/Forms/CreateTeam";
import { api } from "~/utils/api";

export default function Home() {
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
					<button
						onClick={() => addCollege.mutate({ name: "test" })}
					>
						add college
					</button>
					<CreateTeamDialog />
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
							teamName: "test5",
							leadId: "sdfsdfsdf",
							members: [
								{
									password: "Test@123",
									name: "menber",
									college_id: "clmvm9how0004x93tht0gemlt",
									email: "test4@gmail.com",
									isLead: false,
									character_id: "clmvme5kc0000x96gsiwxki1p",
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
