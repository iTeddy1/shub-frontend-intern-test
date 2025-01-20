import { useKeenSlider } from "keen-slider/react";

const ITEM_PER_VIEW = 6;
const ITEM_SPACE = 32;
const IS_LOOP = true;

const carourels = [
  {
    id: 1,
    src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel1.png",
  },
  {
    id: 2,
    src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel2.png",
  },
  {
    id: 3,
    src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel3.png",
  },
  {
    id: 4,
    src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel4.png",
  },
  {
    id: 5,
    src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel5.png",
  },
  {
    id: 6,
    src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel6.png",
  },
];

function App() {
  const [slideRef, instanceRef] = useKeenSlider({
    slides: {
      perView: ITEM_PER_VIEW,
      spacing: ITEM_SPACE,
    },
    loop: IS_LOOP,
  });

  const handlePrevious = (e) => {
    e.stopPropagation();
    instanceRef.current?.prev();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    instanceRef.current?.next();
  };

  return (
    <section className="App">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Head  */}
        <div className="flex items-center mx-auto gap-4 flex-col w-[66%] mb-[55px]">
          <span className="size-14">
            <img
              src="https://shub.edu.vn/_next/image?url=%2Fimages%2Flanding%2Fver3%2Fimage-section%2Fnetworking.gif&w=64&q=75"
              alt=""
              className="size-14"
            />
          </span>
          <p className="font-semibold leading-10 text-[32px] mt-[14px] mb-6">
            Hoạt động tiêu biểu từ cộng đồng giáo dục
          </p>
          <p className="text-[20px] leading-8 text-center">
            Hình ảnh được chính những giáo viên từ khắp 3 miền ghi lại trong quá trình giảng dạy, dạy học ứng dụng công
            nghệ SHub Classroom.
          </p>
        </div>

        <div className="w-full relative">
          <button
            aria-label="Previous"
            onClick={handlePrevious}
            className="absolute flex items-center justify-center -left-6 top-1/2 z-10 size-12 rounded-full text-[#0D0A0B] bg-white   shadow-[0px_16px_16px_0px_rgba(21,_25,_28,_0.25)] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="21"
              height="21"
              stroke-width="1.5">
              <path d="M5 12l14 0"></path>
              <path d="M5 12l6 6"></path>
              <path d="M5 12l6 -6"></path>
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={handleNext}
            className="absolute flex items-center justify-center -right-6 top-1/2 z-10 size-12 rounded-full text-[#0D0A0B] bg-white shadow-[0px_16px_16px_0px_rgba(21,_25,_28,_0.25)] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="21"
              height="21"
              stroke-width="1.5">
              <path d="M5 12l14 0"></path>
              <path d="M15 16l4 -4"></path>
              <path d="M15 8l4 4"></path>
            </svg>
          </button>
          <div
            className={`flex w-full relative`}
            ref={slideRef}
            id="keen-slider">
            {carourels.map((item, index) => (
              <div
                key={item.id}
                className={`keen-slider__slide w-full relative ${index % 2 !== 0 ? "top-0" : "top-10"}`}>
                <img
                  src={item.src}
                  alt=""
                  height={396}
                  className="w-[159px]  object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
