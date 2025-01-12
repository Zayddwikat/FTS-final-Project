interface IncludeHotelsSelectorProps {
  includeHotels: boolean;
  setIncludeHotels: React.Dispatch<React.SetStateAction<boolean>>;
}

const IncludeHotelsSelector: React.FC<IncludeHotelsSelectorProps> = ({
  includeHotels,
  setIncludeHotels,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full gap-4 ">
      <label htmlFor="includeHotels">Include Hotels:</label>
      <select
        className="p-2 border rounded-md"
        onChange={(e) => setIncludeHotels(e.target.value === "true")}
        name="includeHotels"
        id="includeHotels"
      >
        <option value="false">false</option>
        <option value="true">true</option>
      </select>
    </div>
  );
};

export default IncludeHotelsSelector;
