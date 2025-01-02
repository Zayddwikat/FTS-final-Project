import { roomNotFound } from "./constantVariables";

export const SelectHotelToShowRoom: React.FC<any> = () => {
  return (
    <main className="flex flex-row items-center justify-center ml-10 w-full h-dvh ">
      {" "}
      {roomNotFound}
    </main>
  );
};
