import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function LoadingPost() {
  return (
    <div className="flex flex-col  w-full my-4">
       <h1 className="text-3xl">Recent Hotels</h1>
      <section className="flex flex-row w-full">
        {[1, 2, 3].map((elem, index) => (
          <div className="" key={index}>
            <Skeleton
              className="m-4 rounded-md  lg:w-[23dvw] md:w-[80dvw]"
              variant="rectangular"
              height={250}
            />
            <Box className="mx-4" sx={{ pt: 0.5 }}>
              <Skeleton width={300} />
              <Skeleton width={300} />
            </Box>
          </div>
        ))}
      </section>
    </div>
  );
}
