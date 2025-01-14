import { Button } from "../../../login/loginForm/loginButton";

interface CityDetailsProps {
  cityName: string;
  cityDescription: string;
  handleOpenDialog: () => void;
}

const CityDetails: React.FC<CityDetailsProps> = ({
  cityName,
  cityDescription,
  handleOpenDialog,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <article className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
        <div className="flex items-center gap-2">
          <p className="font-medium">City Name:</p>
          <h2 className="text-lg font-bold">{cityName}</h2>
        </div>
        <div className="mx-6">
          <Button
            color=""
            size=""
            value="Delete City"
            isSubmitting={false}
            handleClick={handleOpenDialog}
            primary={false}
          />
        </div>
        
      </article>
      <article className="self-start flex flex-col sm:flex-row items-start w-full">
        <p className="w-full sm:w-2/12">City description:</p>
        <h2 className="w-full sm:w-9/12">{cityDescription}</h2>
      </article>
    </div>
  );
};

export default CityDetails;
