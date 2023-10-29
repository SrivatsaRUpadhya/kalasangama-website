import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic.js";
const Timer = dynamic(() => import("~/components/Home/timer"), { ssr: false });
import Faq from "~/components/Home/faq";
import Reveal from "~/components/Animations/reveal";
import { Button, InactiveButton, OutlineButton } from "~/components/Button";
import { BiDownload } from "react-icons/bi";
import Reel from "~/components/Home/reel";
import { CreateTeamDialog } from "~/components/Forms/CreateTeam";
import { useState } from "react";
import ScrollLag from "~/components/Animations/scrollLag";

const reelImags = [
	{ src: "/banner.jpeg" },
	{ src: "/performing Yakshagana_.jpg" },
	{ src: "/1.png" },
	{ src: "/banner.jpeg" },
	{ src: "/performing Yakshagana_.jpg" },
	{ src: "/1.png" },
];

export default function Home() {
	const [isRegistrationActive, setIsRegistrationActive] =
		useState<boolean>(true);
	const { data: sessionData } = useSession();
	const handleDownload = (path: string, name: string) => {
		// fallback to window.open if the browser doesn't support the download attribute
		const fileUrl = path;
		const fileName = name;

		const link = document.createElement("a");
		link.href = fileUrl;
		link.download = fileName;

		document.body.appendChild(link);
		link.click();

		document.body.removeChild(link);
	};

	return (
		<>
			<Head>
				<title>Create T3 App</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex flex-col">
				<div className="absolute left-0 top-0 -z-50 inline-block h-72 w-full max-w-[1536px] bg-primary-100 min-[1536px]:left-1/2 min-[1536px]:-translate-x-1/2"></div>

				{/* Hero Section */}
				<section className="relative mt-1 h-[83vh] bg-gradient-to-b from-primary-100 via-primary-transparent-50 to-primary-100 sm:h-[80vh]  md:h-[87vh] lg:h-[90vh]">
					<Image
						src={"/Banner-cropped.jpg"}
						alt="Banner"
						className=" -z-10 select-none object-cover object-center opacity-75 drop-shadow-[0_0_30px_theme(colors.primary-100)]"
						fill
					/>
					<div className="mx-4 flex flex-col items-center pt-44 sm:mx-8 sm:pt-36 md:pt-32 lg:mx-32 lg:pt-36 2xl:pt-44">
						{/* Contents - Hero Section */}
						<Reveal classes="">
							<div className="flex flex-col items-center gap-3 pb-16 sm:gap-0 sm:pb-16 md:pb-16 lg:pb-20 2xl:pb-32">
								<div className="font-hindi text-5xl font-bold leading-snug drop-shadow-[0_0_10px_theme(colors.secondary-200)] sm:text-7xl sm:leading-snug md:text-8xl md:leading-normal 2xl:text-9xl 2xl:leading-relaxed">
									kalasangama
								</div>
								<div className="px-5 text-center text-base leading-snug sm:text-lg md:text-xl 2xl:text-4xl">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Reiciendis sint cupiditate
									aut animi sed, impedit explicabo sunt,
									expedita error numquam ratione, quod esse
									ea. Animi!
								</div>
								{sessionData?.user && <CreateTeamDialog />}
							</div>
						</Reveal>
						<Reveal classes="">
							<div className="pb-6 md:pb-8 lg:pb-12 2xl:pb-24">
								{
									//Todo:
									//Issue with onclick when using Button so used button instead
								}
								{
									//	{isRegistrationActive ? (
									//		<Button
									//			onClick={
									//				sessionData
									//					? () => void signOut()
									//					: () => void signIn()
									//			}
									//		>
									//			Register
									//		</Button>
									//	) : (
									//		<InactiveButton>Register</InactiveButton>
									//	)}
								}
								<button
									onClick={
										sessionData
											? () => void signOut()
											: () => void signIn("auth0")
									}
								>
									{sessionData ? "Sign out" : "Sign in"}
								</button>
							</div>
						</Reveal>
					</div>
				</section>

				<div className="flex flex-col gap-10 overflow-hidden bg-gradient-to-t from-primary-50 via-transparent to-primary-100  py-20  md:gap-20">
					<section className="relative mx-4 flex h-[25vh] max-h-40 items-start justify-center sm:mx-8 sm:mb-16 md:mb-0 lg:mx-32">
						<Reveal classes="">
							<ScrollLag classes="" speed={500}>
								<div className="-m-4 h-full md:-m-16">
									{isRegistrationActive && (
										<Timer
											setIsRegistrationActive={
												setIsRegistrationActive
											}
										/>
									)}
								</div>
							</ScrollLag>
						</Reveal>

						<ScrollLag
							speed={100}
							classes="absolute -z-10 h-48 w-48 lg:h-60 lg:w-60 -top-40 -translate-y-[50%] right-0 md:right-[10%] -translate-x-[50%] opacity-50"
						>
							<Image
								src={"/mandala.png"}
								fill
								alt=""
								className="select-none opacity-70  bg-blend-luminosity"
							/>
						</ScrollLag>
					</section>

					{/* About the Competition */}

					<section className="relative flex  min-h-max w-full items-center justify-center md:pb-10">
						<Image
							className="-z-10 object-contain py-16 opacity-25 mix-blend-luminosity sm:py-28 md:py-0"
							src={"/canva.png"}
							fill
							alt="mandala"
						></Image>

						{/* Competition Contents section */}

						<div className="mx-4 flex h-full flex-col items-center gap-5 sm:mx-8 sm:gap-16 lg:mx-32">
							<div className="flex flex-col items-center gap-10 md:flex-row">
								<div className="flex flex-col gap-3">
									<Reveal classes="">
										<div className="text-center font-hindi text-xl sm:text-4xl md:text-left md:text-4xl 2xl:text-5xl">
											About{" "}
											<span className="text-secondary-100">
												competition
											</span>
										</div>
									</Reveal>
									<Reveal classes="">
										<div className="text-center text-xs sm:text-sm md:text-justify md:text-base xl:text-lg">
											<p>
												Immerse yourself in the fusion
												of tradition and innovation as
												our dedicated team invites
												select participants to be part
												of this unique Yakshagana
												competition. This one-of-a-kind
												competition seamlessly
												integrates centuries-old
												storytelling with a modern
												approach, all while preserving
												the essence of this beloved folk
												art. Join us on this
												transformative journey where
												ancient narratives and the rich
												heritage of Yakshagana meets a
												contemporary context of
												technology for better experience
												and transparency.
											</p>
										</div>
									</Reveal>
								</div>
								<div className="flex shrink-0 flex-col items-center gap-3">
									<Reveal classes="">
										<div className="group relative h-48 w-48 shrink-0 overflow-hidden rounded-xl border-2 border-secondary-100 shadow-[0px_0px_12px_#df8b2b] transition duration-200 ease-linear hover:scale-105 sm:h-56 sm:w-56 lg:h-60 lg:w-60">
											<Image
												src={"/about.png"}
												alt="Yakshagana"
												fill
												className=" select-none rounded-xl object-contain object-center transition  duration-300 ease-linear hover:grayscale-0"
											/>
											<div className="relative z-10 h-[200%] w-[200%] -translate-x-full -translate-y-full rotate-45 bg-secondary-transparent-0.5 transition duration-300 ease-linear group-hover:-translate-x-[25%] group-hover:-translate-y-[25%]"></div>
										</div>
									</Reveal>
									<a
										onClick={() =>
											handleDownload("/1.png", "1.png")
										}
										className="w-fit"
									>
										<OutlineButton>
											<div className="flex items-center justify-center gap-2">
												<BiDownload />
												<span>Rule Book</span>
											</div>
										</OutlineButton>
									</a>
								</div>
							</div>

							{/* Rules and regulation section */}

							{/* <div className="flex flex-col gap-3 max-w-2xl">
                <Reveal classes="">
                  <p className="font-hindi text-xl sm:text-4xl md:text-4xl 2xl:text-5xl text-center md:text-left">
                    Rules & <span className="text-secondary-100">regulations</span>
                  </p>
                </Reveal>
                <ul className="text-xs sm:text-sm md:text-base xl:text-lg">
                  <Reveal classes="">
                    <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, nisi!</li>
                  </Reveal>
                  <Reveal classes="">
                    <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> LExplicabo ullam quasi similique deserunt ad voluptas consectetur dolorem</li>
                  </Reveal>
                  <Reveal classes="">
                    <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> Obcaecati consequatur blanditiis unde voluptate eligendi ipsam oprepr enderit</li>
                  </Reveal>
                  <Reveal classes="">
                    <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> Obcaecati consequatur blanditiis unde voluptate eligendi ipsam optio reprehenderit</li>
                  </Reveal>
                  <Reveal classes="">
                    <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, nisi!</li>
                  </Reveal>
                  <Reveal classes="">
                    <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, nisi!</li>
                  </Reveal>
                  <Reveal classes="">
                    <li className="flex items-center gap-3"><GiPaperArrow className="-rotate-45 text-secondary-100 select-none" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, nisi!</li>
                  </Reveal>
                </ul>
              </div> */}
						</div>
					</section>

					{/* Achievements Reel Section */}

					<section className="mb-20 flex w-full justify-center sm:mb-24 md:mb-64 lg:mb-72">
						<Reel
							classes="blur-sm opacity-[0.47] md:opacity-100"
							baseVelocity={1}
							angle={12}
							reelImg={reelImags}
						/>
						<Reel
							classes=""
							baseVelocity={-1.5}
							angle={-12}
							reelImg={reelImags}
						/>
					</section>
					{/* <section className="w-full justify-center hidden md:flex">
            <Reel classes="" baseVelocity={-1.5} angle={0} reelImg={reelImags} />
          </section> */}

					{/* Prizes */}

					{/* <section className="mx-4 sm:mx-8 lg:mx-32 flex flex-col items-center relative">
            <ScrollLag speed={125} classes="absolute -z-10 h-48 w-48 bottom-[60%] -left-28 lg:hidden opacity-50">
              <div className="">
                <Image src={'/mandala.png'} fill alt='' className="object-contain select-none  opacity-70 bg-blend-luminosity" />
              </div> 
            </ScrollLag>
            <Prizes />
          </section> */}

					{/* FAQ */}

					<section className="relative mx-4 flex flex-col items-center gap-3 sm:mx-8 lg:mx-32">
						<ScrollLag
							speed={125}
							classes="absolute -z-10 h-48 w-48 lg:h-60 lg:w-60 bottom-[300%] right-full hidden lg:block -translate-y-full opacity-50"
						>
							<div className="">
								<Image
									src={"/mandala.png"}
									fill
									alt=""
									className="select-none object-contain  opacity-70 bg-blend-luminosity"
								/>
							</div>
						</ScrollLag>
						<Faq />
					</section>
				</div>
			</main>
		</>
	);
}

function AuthShowcase() {
	const { data: sessionData } = useSession();
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<p className="text-center text-2xl ">
				{sessionData && (
					<span>Logged in as {sessionData.user?.name}</span>
				)}
			</p>

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
