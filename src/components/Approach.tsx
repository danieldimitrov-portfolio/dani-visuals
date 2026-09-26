import RichText from "./RichText";
import SectionHeading from "./SectionHeading";

// Grounded in what the project write-ups actually describe.
const CRAFT = [
  {
    title: "Концертни визуализации",
    text: "Главна визия за цялото шоу и отделна визия за всеки изпълнител.",
  },
  {
    title: "3D сцени и модели",
    text: "От 3D модел на залата до 1:1 модели на DJ техника и инструменти.",
  },
  {
    title: "Лууп анимации",
    text: "Сцени, които се редуват, без да крадат фокуса от пърформънса.",
  },
  {
    title: "Синхрон с живото шоу",
    text: "Преходи и появявания, засечени с музиката на сцената.",
  },
];

export default function Approach() {
  return (
    <section id="approach" className="section-pad relative overflow-hidden border-t border-white/10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 -z-10 h-[40rem] w-[40rem] rounded-full bg-violet-600/20 blur-[160px]"
      />
      <div className="shell">
        <SectionHeading index="02" label="Подход" title="Светлината|е всичко" />

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <RichText
            className="reveal text-2xl leading-snug text-white md:text-[2rem] md:leading-[1.35] lg:col-span-7"
            text={
              "Всяка визуализация започва от **историята на изпълнителя** — постера, звука, енергията на вечерта. От нея изграждам *3D светове*, лууп сцени и преходи, които дишат заедно с музиката и превръщат залата в **едно шоу**."
            }
          />

          <ol className="lg:col-span-5">
            {CRAFT.map((item, i) => (
              <li key={item.title} className="group sweep reveal border-t border-white/10 py-6 last:border-b">
                <div className="flex items-baseline gap-5">
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl text-white transition-[color,text-shadow] duration-300 group-hover:text-violet-soft group-hover:text-glow">
                      {item.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-text-body">{item.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
