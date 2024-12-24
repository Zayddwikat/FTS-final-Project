export const confirmBooking = async ({
  customerName,
  hotelName,
  roomNumber,
  roomType,
  bookingDateTime,
  totalCost,
  paymentMethod,
}: {
  customerName: string;
  hotelName: string;
  roomNumber: number;
  roomType: string;
  bookingDateTime: string;
  totalCost: number;
  paymentMethod: string;
}) => {
  const token = localStorage.getItem("USER_TOKEN");
  const response = await fetch(
    "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/bookings",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        customerName,
        hotelName,
        roomNumber,
        roomType,
        bookingDateTime,
        totalCost,
        paymentMethod,
      }),
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Booking failed! ${errorMessage}`);
  }

  const data = await response.json();
  console.table(data);
  return data;
};
