"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PlaceImageProps {
  address: string;
}

const PlaceImage: React.FC<PlaceImageProps> = ({ address }) => {
  const [photoRef, setPhotoRef] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhotoRef = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/google-place?address=${encodeURIComponent(address)}`);
        if (!res.ok) console.log(res);

        const data = await res.json();

        if (data.error) {
          console.error("Error fetching photo reference:", data.error);
          return;
        }

        setPhotoRef(data.photo_reference || null);
      } catch (error) {
        console.error("Error fetching place image ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoRef();
  }, [address]);

  if (loading) return <p>Loading image...</p>;
  if (!photoRef) return <p>No photo found for this address.</p>;

  // Construct Google Places photo URL using the retrieved photo_reference
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

  return (
    <div>
      <Image src={photoUrl} alt={`Image of ${address}`} width={400} height={300} />
      <p className="text-xs text-gray-500">
        Image from Google Places
      </p>
    </div>
  );
};

export default PlaceImage;
