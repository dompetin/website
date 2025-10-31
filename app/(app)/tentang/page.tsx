import Container from "@/components/container";
import { Pattern } from "@/components/pattern";
import Image from "next/image";

// bg-gradient-to-b from-[#E6D8F2] to-30%

export default function TentangKamiPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />
      <Container className="my-32 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12 lg:gap-16">
        <Image
          src="/tentang-kami/hero.png"
          alt="Hero Image"
          quality={100}
          width={900}
          height={400}
          className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]"
        />
        <div className="space-y-4 md:space-y-6 [&_p]:mt-4 md:[&_p]:mt-6">
          <h1 className="mb-8 text-4xl leading-none font-bold text-black sm:text-5xl md:mb-13 md:text-6xl lg:text-7xl xl:text-[3rem]">
            Tentang
            <br />{" "}
            <span className="text-6xl text-purple-400 sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem]">
              Dompetin
            </span>
          </h1>
          <p className="text-sm font-bold sm:text-base md:text-lg">
            Dompetin adalah gerakan yang membentuk generasi muda menjadi
            generasi yang mapan dan sadar finansial.
          </p>
          <p className="text-sm sm:text-base md:text-lg">
            Kami membantu generasi muda memahami cara menabung, berinvestasi,
            dan mengelola uang dengan cerdas.
          </p>
          <p className="text-base font-bold text-[#A267DD] md:text-lg lg:text-xl">
            Dengan Dompetin, belajar finansial jadi sederhana, relevan, dan
            menyenangkan.
          </p>
        </div>
      </Container>
      <Container>
        <hr className="w-full text-gray-400" />
      </Container>
      <Container className="grid grid-cols-1 items-start justify-between gap-18 pt-10 pb-20 sm:grid-cols-2 lg:gap-28 xl:gap-32">
        <div className="md:mt-3">
          <Image
            src="/tentang-kami/visi.png"
            alt="Hero Image"
            quality={100}
            width={900}
            height={400}
            className="w-full scale-70 sm:scale-80 md:scale-90"
          />
          <p className="text-justify text-pretty">
            Menumbuhkan generasi muda Indonesia yang cerdas finansial dan
            mandiri, dengan meningkatkan tingkat literasi keuangan nasional dari
            65,4% menjadi 85% dalam 5–10 tahun ke depan, serta membangun
            kebiasaan menabung yang berkelanjutan.
          </p>
        </div>
        <div>
          <Image
            src="/tentang-kami/misi.png"
            alt="Hero Image"
            quality={100}
            width={900}
            height={400}
            className="w-full scale-70 sm:scale-80 md:scale-90"
          />
          <ul className="ml-5 list-decimal text-lg font-bold text-[#601679] *:text-justify *:text-pretty sm:ml-7 [&_span]:text-base [&_span]:font-normal [&_span]:text-black">
            <li>
              Edukasi Finansial yang Relevan
              <br />
              <span>
                Menyediakan pembelajaran interaktif dan sederhana tentang
                menabung, investasi, dan pengelolaan uang
              </span>
            </li>
            <li>
              Bangun Kebiasaan Finansial Sehat
              <br />
              <span>
                Membantu pelajar memahami risiko dan strategi investasi melalui
                simulasi portofolio yang berbasis data.
              </span>
            </li>
            <li>
              Dorong Gerakan Finansial Muda
              <br />
              <span>
                Mendorong praktik keuangan yang konsisten dan bertanggung jawab
                dalam kehidupan sehari-hari.
              </span>
            </li>
          </ul>
        </div>
      </Container>
    </main>
  );
}
