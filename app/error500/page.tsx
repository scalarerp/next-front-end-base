"use client";
import axiosInstance from "@/lib/http";

export default function IndexPage() {
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/error500");
      // Trabalhe com a resposta bem-sucedida aqui
      console.log(response);
    } catch (error) {
      // Erro tratado pelos interceptadores do Axiosyarn dev

      console.error(error);
    }
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1>pagina teste error 500</h1>

        <button onClick={fetchData}>Fetch Data com Error 500</button>
      </div>
    </section>
  );
}
