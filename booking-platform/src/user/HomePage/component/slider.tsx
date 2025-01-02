import TripImg from "../../../assets/TripImg.jpg";
import { loginImgs } from "../../../const/loginImg";
import { LoginSwiperSection } from "../../../Login/component/LoginSwiperSection";

export default function Slider() {
  return (
    <main className="w-dvw h-[60dvh] relative flex flex-row items-center justify-between  ">
      <div className="relative w-full h-full overflow-hidden ">
        <LoginSwiperSection imgs={loginImgs} noTitle={true} />
      </div>
    </main>
  );
}
