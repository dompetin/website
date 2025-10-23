import Container from "@/components/container";

const KupasPage = () => {
  return (
    <Container className="mt-20">
      <div className="text-center flex flex-col gap-3">
        <h2 className="text-lg md:text-2xl">Cerita dibalik data?</h2>
        <h1 className="font-bold text-4xl md:text-6xl">
          Yuk Kita
          <span className="text-primary">Kupas</span>
        </h1>
        <p>
          Lewat visual, data dan insight, kita cari tahu fenomena keuangan di
          sekitar kita
        </p>
      </div>
    </Container>
  );
};

export default KupasPage;
