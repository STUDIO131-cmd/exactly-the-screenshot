import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl md:text-4xl mb-8 text-foreground">
          O que fotografamos
        </h2>

        <div className="font-body text-lg md:text-xl leading-relaxed text-foreground/80 space-y-6">
          <p>Fotografamos pessoas em momentos reais da vida.</p>
          <p>Não personagens. Não poses vazias. Não há cenas fabricadas.</p>
          <p>
            Nosso estilo é <em>lifestyle</em> porque acreditamos que a beleza está no que
            acontece entre um gesto e outro. No silêncio, no riso espontâneo, no olhar que
            não precisa ser ensaiado.
          </p>
          <p className="text-muted-foreground">
            Ensaios pessoais. Casais. Gestantes. Retratos. 15 anos. Pequenos eventos.
          </p>
          <p>
            O que muda não é o tipo de sessão.
            <br />
            <strong>É o momento vivido.</strong>
          </p>
          <p className="font-display text-2xl md:text-3xl text-foreground mt-8">
            Poesia, sensibilidade e eternidade.
          </p>
          <p className="text-muted-foreground text-base">
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
