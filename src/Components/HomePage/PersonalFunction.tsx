import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { dataPersonal } from "./dataToCard";

const PersonalFunction = () => {
  const [show, setShow] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const handleClick = (id: number) => {
    setShow((prev) => (prev === id ? null : id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="mb-20">
      <h2 className="text-4xl text-center text-white">
        Из чего строится ваш результат
      </h2>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mt-10 grid gap-2 p-2 grid-cols-2 grid-rows-2"
      >
        {dataPersonal.map((el) => (
          <motion.div
            key={el.id}
            variants={cardVariants}
            onClick={() => handleClick(el.id)}
            className={`bg-[#2c2c2b] rounded-lg cursor-pointer transition-all duration-300
              ${
                show === el.id
                  ? "shadow-lg shadow-purple-400 scale-[1.02]"
                  : "shadow-none"
              }
            `}
          >
            <img
              src={el.imgUrl}
              className="h-15 m-2 mb-4 mx-auto"
              alt={el.head}
            />
            <h3 className="text-white text-xl text-center m-2">{el.head}</h3>
            <p className="text-[rgba(255,255,255,0.6)] text-[15px] m-2 p-3">
              {el.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PersonalFunction;
