interface PaginationControlsProps {
  pageNum: number;
  totalPages: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  pageNum,
  totalPages,
  setPageNum,
}) => {
  return (
    <div className="flex w-[95%] justify-end self-end  mb-4">
      <button
        className={`px-3 py-1 mx-1 ${
          pageNum === 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-400"
        }`}
        onClick={() => pageNum > 0 && setPageNum(pageNum - 1)}
        disabled={pageNum === 0}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <a
          key={index}
          onClick={() => setPageNum(index)}
          className={`px-3 py-1 mx-1 cursor-pointer ${
            pageNum === index
              ? "text-white bg-blue-500 rounded"
              : "text-blue-400"
          }`}
        >
          {index + 1}
        </a>
      ))}
      <button
        className={`px-3 py-1 mx-1 ${
          pageNum === totalPages - 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-400"
        }`}
        onClick={() => pageNum < totalPages - 1 && setPageNum(pageNum + 1)}
        disabled={pageNum === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};
