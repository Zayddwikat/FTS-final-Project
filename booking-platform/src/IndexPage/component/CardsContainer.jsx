import PropTypes from "prop-types";
import AirPlane from "../assets/AirPlane.png";
import GuidedTours from "../assets/GuidedTours.png";
import Hotels from "../assets/Hotels.png";

export default function ServiceCards() {
  return (
    <main className="flex md:flex-row flex-col md:items-center gap-2 md:gap-4">
      <Card
        information={{
          img: GuidedTours,
          alt: "Guided Tours",
          ServiceName: "Guided Tours",
          ServiceInfo:
            "We offer best Tours with Guided to help you in the cities.",
        }}
      />
      <Card
        information={{
          img: AirPlane,
          alt: "Air Plane take off",
          ServiceName: "Best Flights",
          ServiceInfo:
            " We offer best flight option with many companies and Air-lines Wild World",
        }}
      />{" "}
      <Card
        information={{
          img: Hotels,
          alt: "Air Plane take off",
          ServiceName: "Best Hotels",
          ServiceInfo:
            "We offer best hotels in the world for mote comfortable ",
        }}
      />
    </main>
  );
}
const Card = ({ information }) => {
  return (
    <div className=" flex flex-col w-[90dvw] md:flex-col md:w-[20dvw]  mt-4 border border-gray-300 p-6 rounded-lg hover:shadow hover:shadow-gray-900">
      <header className="flex flex-row  items-center justify-center">
        <img src={information.img} alt={information.name} />
      </header>
      <main className="flex flex-row justify-center items-center">
        <article className="flex flex-col">
          <h3 className="text-lg self-center">{information.ServiceName}</h3>
          <p className="text-sm text-pretty mt-2">{information.ServiceInfo}</p>
        </article>
      </main>
    </div>
  );
};
Card.propTypes = {
  information: PropTypes.object.isRequired,
};
