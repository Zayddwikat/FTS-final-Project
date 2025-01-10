export const SelectionSection: React.FC<any> = ({ searchOption }) => {
  return (
    <>
      <div>
        <p>Your selected</p>
        <div className="flex items-center gap-2 font-bold">
          <p className="text-md">{searchOption.rooms} </p>
          <p>Room for</p>
          <p>{searchOption.adult} adults</p>
          {searchOption.children > 0 ? (
            <p>and {searchOption.children} children</p>
          ) : (
            <></>
          )}
        </div>
        <a className="text-blue-500 cursor-pointer underline font-bold">
          Change your selection
        </a>
      </div>
    </>
  );
};
