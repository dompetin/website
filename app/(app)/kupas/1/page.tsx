import { Footer } from "../../components/footer";
import Container from "@/components/container";
import { Pattern } from "@/components/pattern";
import { Sectors } from "./components/sectors";
import SectorPerformance from "./components/sector-performance";
import KupasPortofolioChart from "./components/kupas-portofolio-chart";

const Kupas1Page = () => {
  return (
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />
      <Container className="[&_p]:text-justify [&>h3]:my-2">
        <div>
          <h3 className="text-primary text-4xl font-bold">Kupas #1</h3>
          <h2 className="text-6xl font-bold">
            {" "}
            Sektor mana yang paling cuan di bursa saham?
          </h2>
        </div>

        <p>
          Kita sering dengar orang bilang, “saham perbankan paling aman,” atau
          “teknologi itu masa depan.” Tapi seberapa benar sih asumsi-asumsi itu
          kalau dilihat dari data?
        </p>

        <p>
          Setiap industri punya perannya sendiri dalam roda ekonomi Indonesia.
          Ada yang jadi penggerak utama, ada juga yang diam-diam menopang
          stabilitas di belakang layar. Dengan memahami karakter dan fondasi
          tiap sektor, kamu bisa lebih paham gimana uang sebenarnya berputar.
        </p>

        <h4 className="font-bold text-neutral-500">Metodologi</h4>

        <p>
          Kita ambil 10 saham dengan marketcap* terbesar di tiap sektor dari
          IDX** dan bandingkan performa harga mingguannya sepanjang 5 tahun ini.
        </p>

        <h3 className="text-center text-5xl font-bold">
          Yuk cek performa saham berdasarkan sektor
        </h3>

        <SectorPerformance />

        <h3 className="text-center text-5xl font-bold">
          Sektor berdasarkan IDX
        </h3>

        <Sectors />

        <h3 className="text-center text-5xl font-bold">
          Mau lihat pendapatanmu jika uangmu di investasikan ke sektor tertentu?
        </h3>

        <KupasPortofolioChart />
      </Container>
      <Footer />
    </main>
  );
};

export default Kupas1Page;
