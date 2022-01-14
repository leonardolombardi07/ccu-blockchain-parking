import * as React from "react";
// Components
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Avatar as PaperAvatar,
  Button,
  Colors,
  Headline,
  IconButton,
  Modal,
  Portal,
  Snackbar,
} from "react-native-paper";
// Hooks
import { useAuth } from "../../context/auth";
// Services
import * as ImagePicker from "expo-image-picker";
import * as Firebase from "../../services/firebase";
// Constants
import { Window } from "../../constants/Dimensions";

interface HeaderProps {
  theme: ReactNativePaper.Theme;
  onEditName: () => void;
}

function useEditAvatarModal() {
  const [isVisible, setIsVisible] = React.useState(false);
  return {
    isVisible,
    openModal: () => setIsVisible(true),
    closeModal: () => setIsVisible(false),
  };
}

export default function Header({ theme, onEditName }: HeaderProps) {
  const { isVisible, openModal, closeModal } = useEditAvatarModal();
  const [imagePickerError, setImagePickerError] = React.useState("");
  const {
    state: { user },
    dispatch,
  } = useAuth();

  async function openCameraRoll() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.granted == false) return;
      const result = await ImagePicker.launchImageLibraryAsync();
      if (result.cancelled) return;
      dispatch({ type: "EDIT_USER", payload: { photoURL: result.uri } });
      closeModal();
      await Firebase.editUserPhotoUrl(user?.uid || "", result.uri);
    } catch (error) {
      setImagePickerError("Something went wrong");
    }
  }

  async function launchCamera() {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.granted == false) return;
      const result = await ImagePicker.launchCameraAsync();
      if (result.cancelled) return;
      dispatch({ type: "EDIT_USER", payload: { photoURL: result.uri } });
      closeModal();
      await Firebase.editUserPhotoUrl(user?.uid || "", result.uri);
    } catch (error) {
      setImagePickerError("Something went wrong");
    }
  }

  function Avatar() {
    const size = 70;
    const style = [styles.avatar, { zIndex: 0 }];
    if (user?.photoURL)
      return (
        <PaperAvatar.Image
          source={{ uri: user.photoURL }}
          size={size}
          style={style}
        />
      );
    return (
      <PaperAvatar.Icon
        icon={"account-circle-outline"}
        size={size}
        style={style}
      />
    );
  }

  const { colors } = theme;
  return (
    <React.Fragment>
      <View style={[styles.container, { backgroundColor: colors.accent }]}>
        <TouchableOpacity onPress={() => openModal()}>
          <Avatar />
          <IconButton
            icon={"pencil"}
            color={Colors.grey800}
            size={18}
            style={[styles.avatarEditIcon, { zIndex: 1 }]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={onEditName}
        >
          <Headline>{user?.name || "-"}</Headline>
          <IconButton icon={"pencil"} color={Colors.grey800} />
        </TouchableOpacity>
      </View>

      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={closeModal}
          contentContainerStyle={[
            styles.modalContent,
            { backgroundColor: colors.surface },
          ]}
        >
          <Button
            icon={"folder"}
            onPress={openCameraRoll}
            mode="contained"
            style={{ marginBottom: 20 }}
          >
            Select from Camera Roll
          </Button>
          <Button
            icon={"camera"}
            onPress={launchCamera}
            mode="contained"
            style={{ marginBottom: 40 }}
          >
            Take a picture
          </Button>
          <Button onPress={closeModal}>Cancel</Button>
        </Modal>
      </Portal>

      <Snackbar
        visible={Boolean(imagePickerError)}
        onDismiss={() => setImagePickerError("")}
        action={{ label: "Ok" }}
        wrapperStyle={{ width: Window.width(100), alignSelf: "center" }}
      >
        {imagePickerError}
      </Snackbar>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    height: "25%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  avatar: {
    marginRight: 20,
  },
  avatarEditIcon: {
    position: "absolute",
    top: -5,
    right: 5,
  },
  modalContent: {
    flex: 0.5,
    padding: 20,
  },
});
