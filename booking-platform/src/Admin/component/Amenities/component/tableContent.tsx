import { AmenitiesInformation } from "../../../../classes/amenitiesInformation";
import { Button } from "../../../../Login/component/LoginButton";

interface TableContentProp {
  data: Array<AmenitiesInformation>;
  handleOpenDialog: (prop: AmenitiesInformation) => void;
  handleOpenEditDialog: (prop: AmenitiesInformation) => void;
  withEdit?: boolean;
  withDelete?: boolean;
}

export const TableContent: React.FC<TableContentProp> = ({
  data,
  handleOpenDialog,
  handleOpenEditDialog,
  withEdit,
  withDelete = true,
}) => {
  return (
    <>
      <table className="w-full ml-10 my-10 border-collapse border border-gray-300 text-start overflow-y-auto table-fixed">
        <thead className="border">
          <tr className="border">
            <th className="border w-1/5">Index</th>
            <th className="border w-1/5">Name</th>
            <th className="border w-2/5">Description</th>
            {withDelete || withEdit ? (
              <th className="border w-1/5">Amenity info</th>
            ) : null}
          </tr>
        </thead>
        <tbody className="border">
          {data?.map((amenity: AmenitiesInformation, index: number) => (
            <tr className="border text-center" key={index}>
              <td className="border w-1/5">{index}</td>
              <td className="border w-1/5">{amenity.name}</td>
              <td className="border truncate line-clamp-1 p-2 w-full overflow-hidden">
                <p>{amenity.description}</p>
              </td>
              <td className="border  text-center">
                <Button
                  color={"red"}
                  size={"small"}
                  value={"Delete"}
                  isSubmitting={false}
                  handleClick={() => {
                    handleOpenDialog(amenity);
                  }}
                  className={"text-red-400"}
                  children={undefined}
                  primary={false}
                />
                {withEdit ? (
                  <Button
                    color={"red"}
                    size={"small"}
                    value={"Edit"}
                    isSubmitting={false}
                    handleClick={() => {
                      handleOpenEditDialog(amenity);
                    }}
                    className={""}
                    children={undefined}
                    primary={false}
                  />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
