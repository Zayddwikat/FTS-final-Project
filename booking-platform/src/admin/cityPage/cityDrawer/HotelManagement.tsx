import { Button } from "../../../login/loginForm/loginButton";
import { useNavigate } from "react-router-dom";

interface HotelManagementProps {
  cityName: string;
  hotelsLength: number;
  navigateToHotelPage: () => void;
}

const HotelManagement: React.FC<HotelManagementProps> = ({
  cityName,
  hotelsLength,
  navigateToHotelPage,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-around w-full gap-4">
      <div className="flex flex-col sm:flex-row w-full gap-4">
        <p>Number of Hotels: {hotelsLength > 0 ? hotelsLength : 0}</p>
        <Button
          color={""}
          size={"small"}
          value={"Manage Hotels"}
          isSubmitting={false}
          handleClick={navigateToHotelPage}
          className="self-start sm:self-auto"
          children={undefined}
          primary={false}
        />
      </div>
    </div>
  );
};

export default HotelManagement;
