import * as React from "react";
// Componets
import { View, FlatList, StyleSheet } from "react-native";
import {
  List,
  Button,
  Headline,
  HelperText,
  Paragraph,
} from "react-native-paper";
import { LoadingIndicator } from "../../components";
import { Window } from "../../constants/Dimensions";
// Hooks
import { useAuth } from "../../context/auth";
// Services
import * as Firebase from "../../services/firebase";
// Types
import { Parking } from "../../types";

export default function MyParkingsScreen() {
  const { parkings, isLoading, error, fetchParkings } = useParkings();
  console.log(parkings);
  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={parkings}
        keyExtractor={(parking) => parking?.id}
        renderItem={({ item: parking }) => (
          <List.Item
            title={parking?.spot?.title}
            description={`${parking?.startingDate.toLocaleDateString()}-${parking?.endingDate.toLocaleDateString()}`}
            left={(props) => <List.Icon {...props} icon="car" />}
            style={{ width: Window.width(100) }}
          />
        )}
        style={{ flex: 1 }}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={() => {
          if (isLoading)
            return (
              <View style={styles.emptyMargin}>
                <LoadingIndicator />
                <HelperText type="info" style={{ marginTop: 5 }}>
                  Loading parkings
                </HelperText>
              </View>
            );

          if (error)
            return (
              <View style={styles.emptyMargin}>
                <Paragraph style={{ textAlign: "center", marginBottom: 15 }}>
                  Something went wrong. Press the button below to try to load
                  parkings again
                </Paragraph>
                <Button onPress={fetchParkings}>Try Again</Button>
              </View>
            );

          return (
            <View style={styles.emptyMargin}>
              <Headline style={{ textAlign: "center", marginBottom: 5 }}>
                No Parkings Yet
              </Headline>
              <HelperText type="info" style={{ textAlign: "center" }}>
                Park in a spot to see your parkings here
              </HelperText>
            </View>
          );
        }}
      />
    </View>
  );
}

function useParkings() {
  const {
    state: { user },
  } = useAuth();

  const [parkings, setParkings] = React.useState<Parking[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  async function fetchParkings() {
    if (!user?.uid) return;

    setIsLoading(true);
    setError("");
    try {
      const userParkings = await Firebase.getUserParkings(user?.uid);
      setParkings(userParkings);
    } catch (err: any) {
      setError(err || err?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    fetchParkings();
  }, []);

  return { parkings, isLoading, error, fetchParkings };
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
  },
  emptyMargin: {
    marginTop: 30,
  },
});
