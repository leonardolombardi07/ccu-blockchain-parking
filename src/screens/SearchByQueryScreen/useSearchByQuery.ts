import * as React from "react";
// Types
import { Region } from "react-native-maps";
import { MockApi, ParkingSpot } from "../MapSearchScreen/mockParkingApi";

export default function useSearchByQuery(mapRegion: Region) {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [searchedSpots, setSearchedSpots] = React.useState<ParkingSpot[]>([]);
  const [isSearchingByQuery, setIsSearchingByQuery] =
    React.useState<boolean>(false);
  const [findByQueryError, setFindByQueryError] = React.useState<string>("");

  const findByQuery = React.useCallback(
    async function () {
      if (isSearchingByQuery) return;
      setIsSearchingByQuery(true);
      setFindByQueryError("");
      try {
        await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
        const foundSpots = await MockApi.findParkingSpotsNearbyRegion(
          mapRegion
        );
        setSearchedSpots(foundSpots);
      } catch (error: any) {
        setFindByQueryError(error || "Something went wrong");
      } finally {
        setIsSearchingByQuery(false);
      }
    },
    [
      isSearchingByQuery,
      mapRegion,
      setIsSearchingByQuery,
      setFindByQueryError,
      setSearchedSpots,
    ]
  );

  const handleChangeQuery = React.useCallback(
    (q: string) => {
      if (q == "") {
        setSearchedSpots([]);
      }
      setSearchQuery(q);
    },
    [setSearchedSpots, setSearchQuery]
  );

  return {
    searchQuery,
    isSearchingByQuery,
    searchedSpots,
    findByQueryError,
    handleChangeQuery,
    findByQuery,
  };
}
