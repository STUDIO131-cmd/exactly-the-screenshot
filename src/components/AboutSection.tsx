import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-20 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl mb-8 text-neutral-200">
          O que fotografamos
        </h2>

        <div className="text-lg md:text-xl leading-relaxed text-neutral-300 space-y-6">
          <p>Fotografamos pessoas em momentos reais da vida.</p>
          <p>Não personagens. Não poses vazias. Não há cenas fabricadas.</p>
          <p>
            Nosso estilo é <em>lifestyle</em> porque acreditamos que a beleza está no que
            acontece entre um gesto e outro. No silêncio, no riso espontâneo, no olhar que
            não precisa ser ensaiado.
          </p>
          <p className="text-neutral-400">
            Ensaios pessoais. Casais. Gestantes. Retratos. 15 anos. Pequenos eventos.
          </p>
          <p>
            O que muda não é o tipo de sessão.
            <br />
            <strong>É o momento vivido.</strong>
          </p>
          <p className="text-2xl md:text-3xl text-neutral-200 mt-8">
            Poesia, sensibilidade e eternidade.
          </p>
          <p className="text-neutral-400 text-base">
            Esse é o nosso olhar para a sua história.
            <br />
            <em>Fotografia documental.</em>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
