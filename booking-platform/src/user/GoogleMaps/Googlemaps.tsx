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
    // Important! Always set the container height explicitly
    <div style={{ height: "30dvh", width: "100%" }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: `${import.meta.env.React_API_KEY_GOOGLE_MAPS}` }}
        defaultCenter={{ lat, lng }}
        defaultZoom={13}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
