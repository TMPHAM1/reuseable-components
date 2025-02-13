import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Missing address parameter" }, { status: 400 });
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Google API key is missing" }, { status: 500 });
    }

    // Step 1: Fetch place details using the text search endpoint
    console.log("Address to search:", address);
    const placeSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(address)}&key=${apiKey}`;
    const placeRes = await fetch(placeSearchUrl);

    if (!placeRes.ok) {
      return NextResponse.json({ error: "Failed to fetch place data" }, { status: 500 });
    }

    const placeData = await placeRes.json();
    if (!placeData.results?.length) {
      return NextResponse.json({ error: "No place found for address" }, { status: 404 });
    }

    // If the place has photos, extract the photo reference
    const place = placeData.results[0];
    const photoRef = place.photos?.[0]?.photo_reference;

    if (!photoRef) {
      return NextResponse.json({ error: "No photos available for the place" }, { status: 404 });
    }

    // Return the photo reference to the client
    return NextResponse.json({ photo_reference: photoRef });
  } catch (error) {
    console.error("Error fetching place photo:", error);
    return NextResponse.json({ error: "Failed to fetch image ID" }, { status: 500 });
  }
}
