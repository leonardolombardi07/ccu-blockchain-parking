export async function uriToBlobAsync(uri: string): Promise<Blob> {
  const response = await fetch(uri);
  return await response.blob();
}
