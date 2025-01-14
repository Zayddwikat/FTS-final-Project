import WifiIcon from "@mui/icons-material/Wifi";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PoolIcon from "@mui/icons-material/Pool";

interface amenities {
  name: string;
  description: string;
}
interface listProps {
  dataArr: amenities[];
}

export const FacilitiesList: React.FC<any> = ({ dataArr }: listProps) => {
  return (
    <ul className="flex flex-row flex-wrap gap-2 text-lg text-blue-600 items-center mt-2 w-[50%]">
      {dataArr.map((elem) => (
        <li>
          <div className="flex items-center gap-1">
            {elem.name.includes("Free Wi-Fi") ? (
              <>
                <WifiIcon />
                <p className="text-black">{elem.name}</p>
              </>
            ) : elem.name.includes("Fitness Center") ? (
              <>
                <FitnessCenterIcon />
                <p className="text-black">{elem.name}</p>
              </>
            ) : elem.name.includes("Swimming Pool") ? (
              <>
                <PoolIcon />
                <p className="text-black">{elem.name}</p>
              </>
            ) : (
              <>
                {" "}
                <p className="text-black">{elem.name}</p>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
