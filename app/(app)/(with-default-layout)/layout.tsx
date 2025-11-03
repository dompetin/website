import { Pattern } from "@/components/pattern";
import { Footer } from "./components/footer";
import React from "react";

const DefaultLayout = (props: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />
      {props.children}
      <Footer />
    </main>
  );
};

export default DefaultLayout;
