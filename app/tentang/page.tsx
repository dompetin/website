import Container from "@/components/container";
import Image from "next/image";

// bg-gradient-to-b from-[#E6D8F2] to-30%

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen flex items-center flex-col justify-center relative">

      <Container className="flex items-center justify-center flex-col md:flex-row my-32 gap-8 md:gap-12 lg:gap-16">
        <Image
          src="/tentang-kami/hero.png"
          alt="Hero Image"
          quality={100}
          width={900}
          height={400}
          className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]"
        />
        <div className="[&_p]:mt-4 md:[&_p]:mt-6 space-y-4 md:space-y-6">
          <h1 className="font-bold text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[3rem] mb-8 md:mb-13 leading-none">
            Tentang
            <br />{" "}
            <span className="text-purple-400 text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem]">
              Dompetin
            </span>
          </h1>
          <p className="font-bold text-sm sm:text-base md:text-lg">
            Dompetin adalah gerakan yang membentuk generasi muda menjadi
            generasi yang mapan dan sadar finansial.
          </p>
          <p className="text-sm sm:text-base md:text-lg">
            Kami membantu generasi muda memahami cara menabung, berinvestasi,
            dan mengelola uang dengan cerdas.
          </p>
          <p className="font-bold text-[#A267DD] text-base md:text-lg lg:text-xl">
            Dengan Dompetin, belajar finansial jadi sederhana, relevan, dan
            menyenangkan.
          </p>
        </div>
      </Container>
      <Container>
        <hr className="text-gray-400 w-full" />
      </Container>
      <Container className="items-start justify-between grid grid-cols-1 sm:grid-cols-2 gap-18 lg:gap-28 xl:gap-32 pb-20 pt-10">
        <div className="md:mt-3">
          <Image
            src="/tentang-kami/visi.png"
            alt="Hero Image"
            quality={100}
            width={900}
            height={400}
            className="scale-70 sm:scale-80 md:scale-90 w-full"
          />
          <p className="text-pretty text-justify">
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
            className="scale-70 sm:scale-80 md:scale-90 w-full"
          />
          <ul className="list-decimal *:text-pretty *:text-justify text-[#601679] font-bold text-lg [&_span]:text-black [&_span]:font-normal [&_span]:text-base ml-5 sm:ml-7">
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
