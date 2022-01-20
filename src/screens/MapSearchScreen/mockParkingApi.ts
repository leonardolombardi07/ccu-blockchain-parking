// Types
import { Region } from "react-native-maps";

// TYPES
export interface ParkingSpot {
  id: number;
  title: string;
  status: "AVALIABLE" | "UNAVALIABLE";
  coords: { lat: number; lng: number };
  photos: string[];
  reviews: { rating: number; count: number };
  price: { amount: number; currency: string; formatted: string };
  distance: number;
}

// Constants
const EXPECTED_SPOTS_PER_METER_SQUARED = 0.000005;

// API
async function findParkingSpotsNearbyRegion(
  region: Region
): Promise<ParkingSpot[]> {
  try {
    let numberOfSpots = Math.floor(
      getAreaInMetersSquared(region) * EXPECTED_SPOTS_PER_METER_SQUARED
    );
    if (numberOfSpots > 50) {
      numberOfSpots = 50;
    }
    const parkingSpots = [...Array(numberOfSpots).keys()].map((_) =>
      createRandomParkingSpot(region)
    );
    return parkingSpots;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export const MockApi = { findParkingSpotsNearbyRegion };

// UTILS
const getId = (function generateGetId() {
  let id = 0;
  return function getId() {
    return ++id;
  };
})();

function createRandomParkingSpot(region: Region): ParkingSpot {
  const { topLeft, bottomRight } = getMapPoints(region);
  const priceAmount = getRandomNumberBetween(3, 25);
  const id = getId();
  return {
    id,
    title: `Random Street, Number ${id}`,
    coords: {
      lat: getRandomNumberBetween(topLeft.lat, bottomRight.lat),
      lng: getRandomNumberBetween(topLeft.lng, bottomRight.lng),
    },
    distance: 10,
    price: {
      amount: getRandomNumberBetween(3, 25),
      currency: "Euros",
      formatted: `$${priceAmount}`,
    },
    photos: [...Array(getRandomIntegerBetween(1, 10)).keys()]
      .map((n) => getRandomIntegerBetween(10, 1000))
      .map((id) => `https://picsum.photos/id/${id}/200/300`),
    reviews: {
      rating: getRandomNumberBetween(0, 5),
      count: getRandomIntegerBetween(0, 2000),
    },
    status: "AVALIABLE",
  };
}

function getMapPoints({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
}: Region) {
  // See:
  // https://stackoverflow.com/questions/36685372/how-to-zoom-in-out-in-react-native-map/36688156#36688156

  const topLeft = {
    lat: latitude - latitudeDelta / 2,
    lng: longitude - longitudeDelta / 2,
  };

  const topRight = {
    lat: latitude - latitudeDelta / 2,
    lng: longitude + longitudeDelta / 2,
  };

  const bottomLeft = {
    lat: latitude + latitudeDelta / 2,
    lng: longitude - longitudeDelta / 2,
  };

  const bottomRight = {
    lat: latitude + latitudeDelta / 2,
    lng: longitude + longitudeDelta / 2,
  };

  return { topLeft, topRight, bottomRight, bottomLeft };
}

function getAreaInMetersSquared(region: Region): number {
  const { topLeft, topRight, bottomLeft } = getMapPoints(region);
  const width = getDistanceFromLatLngInMeters(topLeft, topRight);
  const height = getDistanceFromLatLngInMeters(bottomLeft, topLeft);
  return width * height;
}

function getDistanceFromLatLngInMeters(
  coords1: { lat: number; lng: number },
  coords2: { lat: number; lng: number }
): number {
  const R = 6371; // Radius of the earth in km

  const { lat: lat1, lng: lng1 } = coords1;
  const { lat: lat2, lng: lng2 } = coords2;

  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInkm = R * c; // Distance in km
  const distanceInMeters = distanceInkm * 1000;
  return distanceInMeters;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

function getRandomNumberBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomIntegerBetween(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
