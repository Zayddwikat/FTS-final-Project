import { AmenitiesInformation } from "../../../data_models/amenitiesInformation";
import { Button } from "../../../login/loginForm/loginButton";

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
              <td className=" truncate line-clamp-1 p-2 w-full overflow-hidden">
                <p>{amenity.description}</p>
              </td>
              {withDelete || withEdit ? (
                <td className="border text-center">
                  {withDelete ? (
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
                  ) : null}
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
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default TableContent;
