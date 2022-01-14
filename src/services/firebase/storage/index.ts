import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

const imagesPath = "images";

export async function uploadUserPhotoUrl(
  blob: Blob,
  uid: string
): Promise<string> {
  const photoRef = ref(storage, `${imagesPath}/user-${uid}-photo`);
  const uploadResult = await uploadBytes(photoRef, blob);
  return getDownloadURL(uploadResult.ref);
}
