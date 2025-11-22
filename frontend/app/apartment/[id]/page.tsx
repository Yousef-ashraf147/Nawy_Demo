import Image from "next/image";
import { API_BASE } from "@/lib/api";
import ContactAgents from "../../components/ContactAgents";
import Link from "next/link";

interface Apartment {
  id: number;
  name: string;
  unitNumber: string;
  project: string;
  price: number;
  description: string;
  imageurl: string;
}

async function getApartment(id: string): Promise<Apartment> {
  const res = await fetch(`${API_BASE}/apartments/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch apartment");
  return res.json();
}

export default async function ApartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const { id } = await params;
  const apartment = await getApartment(id);
  const bedrooms = Math.floor(Math.random() * 3) + 1;      
  const bathrooms = Math.floor(Math.random() * 2) + 1;     
  const area = Math.floor(Math.random() * 120) + 100; 

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Back Button - Top Left */}
<div className="mb-4">
  <Link href="/">
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer w-fit">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span className="font-medium text-gray-700">Back to Home</span>
    </div>
  </Link>
</div>

      {/* Apartment Image */}
      <div className="w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-8 relative">
        <Image
          src={
            apartment.imageurl ||
            "https://newcairo-developments.com/wp-content/uploads/2024/03/apartments-For-sale-in-Palm-Hills-Fifth-Settlement.jpg"
          }
          alt={apartment.name}
          fill
          unoptimized
          className="object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
            {apartment.name}
          </h1>
          <p className="text-white/90 mt-1">
            Project: {apartment.project} • Unit {apartment.unitNumber}
          </p>
        </div>
      </div>

      {/* Price and Contact */}
      <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-2xl md:text-3xl font-bold text-green-600">
            {apartment.price.toLocaleString()} EGP
          </p>
          <ContactAgents />
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">
          {apartment.description}
        </p>
      </div>

      {/* Additional Details / Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
          <h3 className="font-semibold mb-2">Bedrooms</h3>
          <p>{bedrooms}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
          <h3 className="font-semibold mb-2">Bathrooms</h3>
          <p>{bathrooms}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
          <h3 className="font-semibold mb-2">Area</h3>
          <p>{area} m²</p>
        </div>
      </div>
    </div>
  );
}
