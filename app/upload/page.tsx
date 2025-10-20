import UploadForm from "../../components/UploadForm";

export default function UploadPage() {
  return (
    <section className="min-h-screen py-20 px-6 bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-cyan-400 mb-2">Upload Project</h1>
        <p className="text-gray-400">Masukkan project baru untuk ditampilkan di portofolio kamu</p>
      </div>
      <UploadForm />
    </section>
  );
}
