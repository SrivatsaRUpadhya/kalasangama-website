import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic.js";
const Timer = dynamic(() => import('~/components/Home/timer'), { ssr: false })
import Faq from "~/components/Home/faq";
import Reveal from "~/components/Animations/reveal";
import { Button, InactiveButton, OutlineButton } from "~/components/Button";
import { BiDownload } from "react-icons/bi"
import Reel from "~/components/Home/reel";
import { CreateTeamDialog } from "~/components/Forms/CreateTeam";
import { api } from "~/utils/api";
import { useState } from "react";
import ScrollLag from "~/components/Animations/scrollLag";
import { Router, useRouter } from "next/router";
import kn from "~/locale/kn";
import en from "~/locale/en";

const reelImags = [
  { src: "/banner.jpeg" },
  { src: "/performing Yakshagana_.jpg" },
  { src: "/1.png" },
  { src: "/banner.jpeg" },
  { src: "/performing Yakshagana_.jpg" },
  { src: "/1.png" },
]

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const [isRegistrationActive, setIsRegistrationActive] = useState<Boolean>(true)

  const handleDownload = (path: string, name: string) => {
    // fallback to window.open if the browser doesn't support the download attribute
    const fileUrl = path;
    const fileName = name;

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const router = useRouter()
  const t = router.locale === "en" ? en : kn

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col">
        <AuthShowcase />
        <div className="h-72 bg-primary-100 absolute top-0 left-0 w-full -z-50 inline-block min-[1536px]:left-1/2 min-[1536px]:-translate-x-1/2 max-w-[1536px]"></div>

        {/* Hero Section */}
        <CreateTeamDialog></CreateTeamDialog>
        <section className="relative h-[83vh] sm:h-[80vh] md:h-[87vh] lg:h-[90vh] bg-gradient-to-b from-primary-100 via-primary-transparent-50  to-primary-100 mt-1">
          <Image src={'/Banner-cropped.jpg'} alt="Banner" className=" select-none object-cover opacity-75 object-center -z-10 drop-shadow-[0_0_30px_theme(colors.primary-100)]" fill />
          <div className="mx-4 sm:mx-8 lg:mx-32 pt-44 sm:pt-36 md:pt-32 lg:pt-36 2xl:pt-44 flex flex-col items-center">

            {/* Contents - Hero Section */}
            <Reveal classes="">
              <div className="flex flex-col items-center pb-16 sm:pb-16 md:pb-16 lg:pb-20 2xl:pb-32 gap-3 sm:gap-0">
                <div className="font-hindi font-bold text-5xl sm:text-7xl md:text-8xl 2xl:text-9xl leading-snug sm:leading-snug md:leading-normal 2xl:leading-relaxed drop-shadow-[0_0_10px_theme(colors.secondary-200)]">{t.title}</div>
                <div className="text-base sm:text-lg md:text-xl 2xl:text-4xl px-5 text-center leading-snug">{t.subTitle}</div>
              </div>

            </Reveal>
            <Reveal classes="">
              <div className="pb-6 md:pb-8 lg:pb-12 2xl:pb-24">
                {isRegistrationActive ? <Button>Register</Button> : <InactiveButton>Register</InactiveButton>}
              </div>
            </Reveal>
          </div>
        </section>

        <div className="flex flex-col gap-10 md:gap-20 py-20 bg-gradient-to-t from-primary-50 via-transparent  to-primary-100  overflow-hidden">

          <section className="relative h-[25vh] sm:mb-16 md:mb-0 max-h-40 flex items-start mx-4 sm:mx-8 lg:mx-32 justify-center">
            <Reveal classes="">
              <ScrollLag classes="" speed={500}>
                <div className="h-full -m-4 md:-m-16">
                  {isRegistrationActive && <Timer setIsRegistrationActive={setIsRegistrationActive} />}
                </div>
              </ScrollLag>
            </Reveal>

            <ScrollLag speed={100} classes="absolute -z-10 h-48 w-48 lg:h-60 lg:w-60 -top-40 -translate-y-[50%] right-0 md:right-[10%] -translate-x-[50%] opacity-50">
              <Image src={'/mandala.png'} fill alt='' className="opacity-70 select-none  bg-blend-luminosity" />
            </ScrollLag>
          </section>

          {/* About the Competition */}

          <section className="relative min-h-max  flex items-center md:pb-10 w-full justify-center">
            <Image className="object-contain mix-blend-luminosity opacity-25 py-16 sm:py-28 md:py-0 -z-10" src={'/canva.png'} fill alt="mandala"></Image>

            {/* Competition Contents section */}

            <div className="mx-4 sm:mx-8 lg:mx-32 flex flex-col h-full items-center gap-5 sm:gap-16">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex flex-col gap-3">
                  <Reveal classes="">
                    <div className="font-hindi text-xl sm:text-4xl md:text-4xl 2xl:text-5xl text-center md:text-left">
                      About <span className="text-secondary-100">competition</span>
                    </div>
                  </Reveal>
                  <Reveal classes="">
                    <div className="text-xs sm:text-sm md:text-base xl:text-lg text-center md:text-justify">
                      <p>{t.about}</p>
                    </div>
                  </Reveal>
                </div>
                <div className="shrink-0 flex flex-col gap-3 items-center">
                  <Reveal classes="">
                    <div className="group h-48 w-48 sm:h-56 sm:w-56 lg:h-60 lg:w-60 relative shrink-0 overflow-hidden border-2 border-secondary-100 shadow-[0px_0px_12px_#df8b2b] hover:scale-105 transition duration-200 ease-linear rounded-xl">
                      <Image src={'/about.png'} alt="Yakshagana" fill className=" select-none object-contain object-center rounded-xl hover:grayscale-0  transition duration-300 ease-linear" />
                      <div className="h-[200%] w-[200%] rotate-45 -translate-x-full -translate-y-full group-hover:-translate-x-[25%] group-hover:-translate-y-[25%] transition duration-300 ease-linear bg-secondary-transparent-0.5 relative z-10"></div>
                    </div>
                  </Reveal>
                  <a onClick={() => handleDownload("/1.png", "1.png")} className="w-fit">
                    <OutlineButton>
                      <div className="flex gap-2 items-center justify-center">
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

          <section className="w-full flex justify-center mb-20 sm:mb-24 md:mb-64 lg:mb-72">
            <Reel classes="blur-sm opacity-[0.47] md:opacity-100" baseVelocity={1} angle={12} reelImg={reelImags} />
            <Reel classes="" baseVelocity={-1.5} angle={-12} reelImg={reelImags} />
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

          <section className="mx-4 sm:mx-8 lg:mx-32 flex flex-col gap-3 items-center relative">
            <ScrollLag speed={125} classes="absolute -z-10 h-48 w-48 lg:h-60 lg:w-60 bottom-[300%] right-full hidden lg:block -translate-y-full opacity-50">
              <div className="">
                <Image src={'/mandala.png'} fill alt='' className="object-contain select-none  opacity-70 bg-blend-luminosity" />
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

        <CreateTeamDialog></CreateTeamDialog>
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
