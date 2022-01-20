// Components
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
// Constants
import { Window } from "../../constants/Dimensions";
// Types
import { ParkingSpot } from "../../screens/MapSearchScreen/mockParkingApi";

interface ParkingSpotCardProps {
  spot: ParkingSpot;
  children?: React.ReactNode;
  style?: any; // FIX
}

export default function ParkingSpotCard({
  children,
  spot,
  style,
}: ParkingSpotCardProps) {
  const { title, price, distance, photos } = spot;
  return (
    <Card style={[styles.content, style]}>
      <Card.Content>
        <Title>{title || "-"}</Title>
        <Paragraph>{`Price: ${
          price ? Math.round(price.amount) : "-"
        }$ | Distance: ${distance}m`}</Paragraph>
      </Card.Content>

      <Card.Cover
        source={{
          uri: photos ? photos[0] : "https://picsum.photos/700",
        }}
        style={{ marginVertical: 10 }}
      />

      {children}
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    bottom: 0,
    width: Window.width(100),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: "center",
  },
});
