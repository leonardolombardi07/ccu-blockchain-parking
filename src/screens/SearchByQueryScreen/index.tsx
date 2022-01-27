// Components
import { View, StyleSheet, FlatList, StatusBar } from "react-native";
import {
  Button,
  HelperText,
  List,
  Paragraph,
  Searchbar,
} from "react-native-paper";
import { LoadingIndicator } from "../../components";
// Hooks
import useSearchByQuery from "./useSearchByQuery";
// Constants
import { Window } from "../../constants/Dimensions";
// Types
import { StackScreenProps } from "@react-navigation/stack";
import { ParkStackParamList } from "../../navigation";

type SearchByQueryScreenProps = StackScreenProps<
  ParkStackParamList,
  "SearchByQuery"
> & {
  theme: ReactNativePaper.Theme;
};

export default function SearchByQueryScreen({
  navigation,
  route,
}: SearchByQueryScreenProps) {
  const {
    searchQuery,
    isSearchingByQuery,
    findByQueryError,
    searchedSpots,
    handleChangeQuery,
    findByQuery,
  } = useSearchByQuery(route.params.mapRegion);

  return (
    <View style={styles.screenContainer}>
      <Searchbar
        value={searchQuery}
        onChangeText={handleChangeQuery}
        placeholder="Where are you going?"
        style={styles.searchBar}
        icon={"arrow-left"}
        onIconPress={() => navigation.goBack()}
        onSubmitEditing={findByQuery}
        autoFocus
      />

      <FlatList
        keyboardShouldPersistTaps={"always"}
        data={searchedSpots}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item: spot }) => (
          <List.Item
            title={spot.title}
            description={`Price: ${spot.price.amount}$ | Distance: ${spot.distance}m`}
            left={(props) => <List.Icon {...props} icon="magnify" />}
            onPress={() => {
              navigation.navigate("StartParking", {
                parkingSpot: spot,
              });
            }}
          />
        )}
        ListEmptyComponent={() => {
          if (isSearchingByQuery) {
            return (
              <View style={styles.centeredView}>
                <LoadingIndicator />
                <HelperText type="info" style={{ marginTop: 5 }}>
                  Loading search results...
                </HelperText>
              </View>
            );
          }

          const message = findByQueryError
            ? "Something went wrong. Press type another input and try again "
            : !searchQuery
            ? "Type where your are going to find search results"
            : "Press enter or the buttow bellow to find results";

          const showButton = Boolean(!findByQueryError && searchQuery);

          return (
            <View style={styles.centeredView}>
              <Paragraph style={{ textAlign: "center", marginBottom: 15 }}>
                {message}
              </Paragraph>
              {showButton && (
                <Button mode="contained" onPress={findByQuery}>
                  Find results
                </Button>
              )}
            </View>
          );
        }}
        style={styles.flatlist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 25,
  },
  searchBar: {
    width: Window.width(90),
  },
  centeredView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  flatlist: {
    flex: 1,
    width: "100%",
  },
});
