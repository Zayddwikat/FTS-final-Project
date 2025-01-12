import { CityInformation } from "../../../data_models/cities";
import { Button } from "../../../login/loginForm/loginButton";
import { AddCityDialog } from "../addNewCity/addCityDialog";

interface CityHeaderProps {
  handleClickOpen: (index: number) => void;
  handleClose: () => void;
  openIndex: number | null;
  cities: CityInformation[];
}

export const CityHeader: React.FC<CityHeaderProps> = ({
  handleClickOpen,
  handleClose,
  openIndex,
  cities,
}) => (
  <div className="self-start w-11/12 flex items-center justify-between mx-10">
    <h1 className="text-2xl font-bold">Cities</h1>
    <Button
      children
      className=""
      color="blue"
      handleClick={handleClickOpen}
      isSubmitting={false}
      primary={true}
      size="small"
      value="Add City"
    />
    <AddCityDialog handleClose={handleClose} open={openIndex} cities={cities} />
  </div>
);
