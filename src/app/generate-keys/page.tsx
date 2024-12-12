import BackButton from "@/components/Button/Back";
import KeysGenerationForm from "@/components/Form/KeysGeneration";
import KeysPreview from "@/components/Preview/Keys";

export default function Encryption() {
  return (
    <div className="flex flex-col px-6 py-12 gap-12 md:px-16 md:py-16">
      <header className="flex gap-4">
        <BackButton />

        <div className="flex flex-col items-start justify-start gap-2 flex-1">
          <h1 className="text-3xl font-logotype font-bold leading-none text-antiflash-white">
            CryptoRSA
          </h1>
          <h2 className="text-base font-body font-medium leading-none text-cool-gray">
            A RSA crypto library
          </h2>
        </div>
      </header>

      <main className="flex flex-col gap-8 w-full md:flex-row lg:gap-32">
        <div className="flex flex-col gap-4 w-full sm:max-w-xl">
          <p className="text-xl leading-normal font-semibold text-cool-gray">
            Geração de chaves RSA
          </p>

          <KeysGenerationForm />
        </div>

        <KeysPreview />
      </main>
    </div>
  );
}
