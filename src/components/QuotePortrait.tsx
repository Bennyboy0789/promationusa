import Image from "next/image";

/**
 * Portrait for an attributed quote.
 *
 * Sits *above* the quote card rather than inside it: the cards are shaped with
 * `clip-path`, which would slice a cut-out figure off at the card edge. The
 * figure spans the card width and stands on its top edge; the name and role are
 * attributed inside the card, where a quotation expects them.
 *
 * With no approved headshot it falls back to a monogram — a stand-in face would
 * misrepresent a named person.
 */
export function QuotePortrait({
  src,
  name,
  role,
}: {
  src?: string;
  name: string;
  role: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  if (!src) {
    return (
      <div className="mb-5 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/10 font-display text-xl font-bold text-blue-600">
          {initials}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-72 w-full sm:h-[26rem]">
      {/* a soft plate so the cut-out has something to stand on */}
      <div
        aria-hidden
        className="absolute inset-x-12 bottom-0 h-32 rounded-[50%] bg-blue-500/15 blur-2xl"
      />
      <Image
        src={src}
        alt={`${name}, ${role} of PROMATION USA`}
        fill
        sizes="(max-width: 640px) 100vw, 420px"
        className="object-contain object-bottom"
      />
    </div>
  );
}
