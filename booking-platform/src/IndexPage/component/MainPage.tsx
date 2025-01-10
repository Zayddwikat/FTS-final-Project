import ServiceCards from "./cardsContainer";
export default function MainPage() {
  return (
    <main className="flex flex-col items-center my-20">
      {" "}
      <h3 className="text-blue-500 text-lg">Category</h3>
      <h2 className="text-4xl">We Offer Best Service</h2>
      <ServiceCards />
    </main>
  );
}
