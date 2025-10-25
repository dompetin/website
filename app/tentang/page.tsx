import Container from "@/components/container";
import Image from "next/image";

export default function TentangKamiPage() {
  return (
    <Container className="min-h-screen flex items-center justify-center">
      <section className="flex items-center justify-center flex-col md:flex-row py-32">
        <Image
          src="/tentang-kami/hero.png"
          alt="Hero Image"
          quality={100}
          width={900}
          height={400}
          className="max-w-[360px]"
        />
        <div className="[&_p]:mt-6">
          <h1 className="font-bold text-black text-4xl mb-13">
            Tentang
            <br /> <span className="text-purple-400 text-6xl">Dompetin</span>
          </h1>
          <p>
            Dompetin adalah gerakan yang membentuk generasi muda menjadi
            generasi yang mapan dan sadar finansial.
          </p>
          <p>
            Kami membantu generasi muda memahami cara menabung, berinvestasi,
            dan mengelola uang dengan cerdas.
          </p>
          <p>
            Dengan Dompetin, belajar finansial jadi sederhana, relevan, dan
            menyenangkan.
          </p>
        </div>
      </section>
      <hr className="text-gray-400 w-full" />
      <section className="items-start justify-between grid grid-cols-1 sm:grid-cols-2 gap-18 lg:gap-28 xl:gap-32">
        <div className="md:mt-3">
          <Image
            src="/tentang-kami/visi.png"
            alt="Hero Image"
            quality={100}
            width={900}
            height={400}
            className="scale-90"
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
            className="scale-90"
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
      </section>
    </Container>
  );
}
