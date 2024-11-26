import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function LoadingPost() {
  return (
    <div className="flex flex-row flex-wrap w-full">
      {[1, 2, 3, 4].map((elem, index) => (
        <div className="" key={index}>
          <Skeleton
            className="m-4 rounded-md w-full lg:w-[23dvw] md:w-[70dvw]"
            variant="rectangular"
            height={250}
          />
          <Box className="mx-4" sx={{ pt: 0.5 }}>
            <Skeleton width={300} />
            <Skeleton width={300} />
          </Box>
        </div>
      ))}
    </div>
  );
}
