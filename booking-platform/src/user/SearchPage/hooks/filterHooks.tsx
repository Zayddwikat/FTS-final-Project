import { useState } from "react";

interface onFilterInformation {
  filter: string;
  data: any;
}

export default function useFilterSelected() {
  const [filteredData, setFilteredData] = useState([]);
  const onFilteredAdded = ({ filter, data }: onFilterInformation) => {
    const filtered = data.filter((elem: any) =>
      elem.amenities.some((elem2: any) => elem2.name === filter)
    );
    setFilteredData(filtered);
  };

  return { filteredData, onFilteredAdded };
}
