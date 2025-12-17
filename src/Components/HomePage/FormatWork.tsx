const FormatWork = () => {
  return (
    <section className="mb-10 mt-5">
      <h2 className="text-4xl  text-center text-white">Формат работы</h2>
      <div className="grid grid-cols-1 mt-5 p-2 gap-5">
        <div className="bg-[#2c2c2b] rounded-lg">
          <h3 className="text-white text-2xl text-center m-2">Офлайн</h3>
          <p className="text-[rgba(255,255,255,0.6)] m-2 p-3">
            Подходит для тех, кто только начинает заниматься фитнесом, а также
            имеющим опыт спортсменам
          </p>
        </div>
        <div className="bg-[#2c2c2b] rounded-lg">
          <h3 className="text-white text-2xl text-center m-2">Онлайн</h3>
          <p className="text-[rgba(255,255,255,0.6)] m-2 p-3">
          Требует чуть большей самостоятельности и дисциплины. Подходит тем,
          кто уже имеет навыки в фитнесе
          </p>
        </div>
        <div className="mt-10 w-full h-0.5 bg-linear-to-r from-transparent via-(--color-main-theme) to-transparent opacity-100"></div>
      </div>
    </section>
  );
};
export default FormatWork;
