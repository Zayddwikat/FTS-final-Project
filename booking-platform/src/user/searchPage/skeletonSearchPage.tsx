import Skeleton from "@mui/material/Skeleton";
import Header from "../homePage/component/header/header";

export const SkeletonSearchPage: React.FC = () => {
  const skeletonPosts = Array.from({ length: 5 }); // Adjust the number of placeholders as needed

  return (
    <main className="flex flex-col w-full items-center justify-center">
      <Header />
      <main className="flex flex-col justify-center items-center gap-2 w-full md:w-[95vw] lg:w-[90vw] px-4">
        <header className="w-full mb-4">
          <Skeleton variant="rectangular" width="100%" height={60} className="rounded-md" />
        </header>
        <main className="flex flex-col lg:flex-row gap-4 w-full">
          <aside className="flex flex-col items-center gap-4 w-full lg:w-1/5 mb-6">
            <form className="w-full p-4 border border-black rounded-md shadow-lg flex flex-col items-center gap-4">
              <Skeleton variant="rectangular" width="100%" height={50} />
              <Skeleton variant="rectangular" width="100%" height={50} />
              <Skeleton variant="rectangular" width="100%" height={30} />
            </form>
          </aside>
          <section className="flex flex-col gap-6 w-full lg:w-4/5 mb-10">
            {skeletonPosts.map((_, index) => (
              <div key={index} className="gap-2">
                <Skeleton variant="rectangular" width="100%" height={120} className="rounded-md" />
              </div>
            ))}
          </section>
        </main>
      </main>
    </main>
  );
};

export default SkeletonSearchPage;
