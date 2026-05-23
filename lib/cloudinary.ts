const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

export function cloudinaryUrl(
  publicId: string,
  opts: { width?: number; height?: number; quality?: number } = {}
): string {
  const transforms = [
    opts.width ? `w_${opts.width}` : null,
    opts.height ? `h_${opts.height}` : null,
    opts.quality ? `q_${opts.quality}` : "q_auto",
    "f_auto",
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

export async function uploadToCloudinary(
  file: File,
  folder = "pharmacierommana/products"
): Promise<{ publicId: string; url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_preset"); // set up in Cloudinary dashboard
  formData.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");

  const data = await res.json();
  return { publicId: data.public_id, url: data.secure_url };
}

export { CLOUD_NAME, API_KEY, API_SECRET };
