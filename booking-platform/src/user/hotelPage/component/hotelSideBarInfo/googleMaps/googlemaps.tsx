import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({
  text,
  lat,
  lng,
}: {
  text: string;
  lat: number;
  lng: number;
}) => <div>{text}</div>;

export default function SimpleMap({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div style={{ height: "30dvh", width: "100%" }}>
      <GoogleMapReact
        defaultCenter={{ lat, lng }}
        defaultZoom={13}
      >
        <AnyReactComponent lat={lat} lng={lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
