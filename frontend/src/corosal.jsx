import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const fitnessGoals = [
  {
    title: "Build Muscles",
    description:
      "Strength training exercises like weightlifting and bodyweight workouts help increase muscle mass, improve metabolism, and enhance overall strength. 💪",
    image:
      "https://images.unsplash.com/photo-1554344728-77cf90d9ed26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Lose Weight",
    description:
      "A combination of cardio and strength training helps burn calories, reduce body fat, and maintain a healthy weight. A balanced diet further supports weight loss. 🏃‍♂️",
    image:
      "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9zZSUyMHdlaWdodHxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    title: "Improve Stamina",
    description:
      "Aerobic exercises such as running, cycling, and swimming improve cardiovascular endurance, allowing you to perform daily activities with more energy and less fatigue. 🚴‍♂️",
    image:
      "https://images.unsplash.com/photo-1521404495898-64de72eda993?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGltcHJvdmUlMjBzdGFtaW5hfGVufDB8fDB8fHwy",
  },
  {
    title: "Enhance Flexibility",
    description:
      "Stretching exercises, yoga, and mobility drills help increase flexibility, reduce stiffness, and prevent injuries by improving joint movement and muscle elasticity. 🧘‍♀️",
    image:
      "https://images.unsplash.com/photo-1562088287-bde35a1ea917?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHlvZ2F8ZW58MHx8MHx8fDI%3D",
  },
];

function FitnessGallery() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-3">Different Fitness Goals,One Destination</h1>
      <div className="relative w-[80vw] h-[70vh] overflow-visible">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500, // Slide change every 2.5 seconds
            disableOnInteraction: false, // Keeps autoplay running after manual interaction
          }}
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3,
            slideShadows: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 }, // Mobile: 1 slide
            640: { slidesPerView: 2 }, // Tablet: 2 slides
            1024: { slidesPerView: 3 }, // Desktop: 3 slides
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]} // ✅ Ensure Autoplay module is included
          className="w-full h-full"
        >
          {fitnessGoals.map((goal, index) => (
            <SwiperSlide key={index} className="w-64 h-80">
              <div className="rounded-2xl shadow-lg p-4 flex flex-col items-center text-center">
                <img
                  src={goal.image}
                  alt={goal.title}
                  className="w-full h-48 object-cover rounded-xl mb-2"
                />
                <h2 className="text-lg font-semibold">{goal.title}</h2>
                <p className="text-gray-600 text-sm">{goal.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default FitnessGallery;
