// Utils
import * as Random from "../../utils/Random";
import * as ID from "../../utils/ID";
import * as MapUtil from "../../utils/Map";
// Types
import { Region } from "react-native-maps";
import { ParkingSpot } from "../../types";

// API
export async function findParkingSpotsNearbyRegion(
  region: Region
): Promise<ParkingSpot[]> {
  try {
    const numberOfSpots = 50;
    const parkingSpots = [...Array(numberOfSpots).keys()].map((_) =>
      createRandomParkingSpot(region)
    );
    return parkingSpots;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

const getNextId = ID.generateClosuredId();
export function createRandomParkingSpot(region: Region): ParkingSpot {
  const { topLeft, bottomRight } = MapUtil.getMapExtremities(region);
  const priceAmount = Random.getNumBetween(3, 25);
  const id = getNextId();
  return {
    id,
    title: `Random Street, Number ${id}`,
    coords: {
      lat: Random.getNumBetween(topLeft.lat, bottomRight.lat),
      lng: Random.getNumBetween(topLeft.lng, bottomRight.lng),
    },
    distance: 10,
    price: {
      amount: Random.getNumBetween(3, 25),
      currency: "Euros",
      formatted: `$${priceAmount}`,
    },
    photos: [...Array(Random.getIntBetween(1, 10)).keys()]
      .map((n) => Random.getIntBetween(10, 1000))
      .map((id) => `https://picsum.photos/id/${id}/200/300`),
    reviews: {
      rating: Random.getNumBetween(0, 5),
      count: Random.getIntBetween(0, 2000),
    },
    status: "AVALIABLE",
  };
}
