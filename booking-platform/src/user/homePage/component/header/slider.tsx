import TripImg from "../../../assets/TripImg.jpg";
import { loginImgs } from "../../../../const/loginImg";
import { lazy, Suspense } from "react";
import { LoadingScreen } from "../../../../component/loadingPage";
import SkeletonLoader from "./sliderSkeletonScreen";

const LoginSwiperSection = lazy(
  () => import("../../../../login/loginImageSwiper/loginSwiperSection")
);

export default function Slider() {
  return (
    <main className="w-dvw h-[60dvh] relative flex flex-row items-center justify-between  ">
      <div className="relative w-full h-full overflow-hidden ">
        <Suspense fallback={<SkeletonLoader />}>
          <LoginSwiperSection imgs={loginImgs} noTitle={true} />
        </Suspense>
      </div>
    </main>
  );
}


