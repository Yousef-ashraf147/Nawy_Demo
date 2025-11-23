import Image from "next/image";
import { API_BASE } from "@/lib/api";
import ContactAgents from "../../components/ContactAgents";
import Link from "next/link";
import { LuBedDouble, LuBath, LuRuler, LuMapPin, LuCalendar } from "react-icons/lu";

function getDaysSince(dateString: string) {
  const posted = new Date(dateString);
  const now = new Date();
  return Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
}

function formatPostedDate(days: number) {
  if (days === 0) return "Posted today";
  if (days === 1) return "Posted 1 day ago";
  return `Posted ${days} days ago`;
}

interface Apartment {
  id: number;
  name: string;
  unitnumber: string;
  project: string;
  price: number;
  description: string;
  imageurl: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  date_posted: string;
}

async function getApartment(id: string): Promise<Apartment> {
  const res = await fetch(`${API_BASE}/apartments/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch apartment");
  return res.json();
}

export default async function ApartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apartment = await getApartment(id);

  const daysSincePosted = getDaysSince(apartment.date_posted);
  const isNew = daysSincePosted <= 7;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Back Button */}
      <div className="mb-6">
        <Link href="/">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer w-fit">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium text-gray-700">Back to Home</span>
          </div>
        </Link>
      </div>

    
      <div className="w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-8 relative">
        <Image
          src={apartment.imageurl}
          alt={apartment.name}
          fill
          unoptimized
          className="object-cover object-center"
        />

        {/* "NEW" Icon */}
        {isNew && (
  <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
    NEW
  </div>
)}


       
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
            {apartment.name}
          </h1>

         
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="text-white/90 text-sm">
              {apartment.project} • Unit {apartment.unitnumber}
            </span>

            <span className="flex items-center gap-1 text-white/95 bg-black/30 backdrop-blur px-2 py-1 rounded-full text-xs font-medium">
              <LuCalendar className="w-4 h-4" />
              {formatPostedDate(daysSincePosted)}
            </span>
          </div>
        </div>
      </div>

     
      <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            {apartment.price.toLocaleString()} EGP
          </p>
          <ContactAgents />
        </div>

        <p className="text-gray-700 leading-relaxed text-lg">
          {apartment.description}
        </p>
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-4 gap-6">

     
        <div className="p-5 bg-gray-50 rounded-xl shadow hover:shadow-md transition flex items-center gap-4">
          <LuBedDouble className="w-6 h-6 text-gray-700" />
          <div>
            <h3 className="font-semibold">Bedrooms</h3>
            <p className="text-gray-600">{apartment.bedrooms} {apartment.bedrooms === 1 ? "Room" : "Rooms"}</p>
          </div>
        </div>

      
        <div className="p-5 bg-gray-50 rounded-xl shadow hover:shadow-md transition flex items-center gap-4">
          <LuBath className="w-6 h-6 text-gray-700" />
          <div>
            <h3 className="font-semibold">Bathrooms</h3>
            <p className="text-gray-600">{apartment.bathrooms} {apartment.bathrooms === 1 ? "Bathroom" : "Bathrooms"}</p>
          </div>
        </div>

       
        <div className="p-5 bg-gray-50 rounded-xl shadow hover:shadow-md transition flex items-center gap-4">
          <LuRuler className="w-6 h-6 text-gray-700" />
          <div>
            <h3 className="font-semibold">Area</h3>
            <p className="text-gray-600">{apartment.area} m²</p>
          </div>
        </div>

        
        <div className="p-5 bg-gray-50 rounded-xl shadow hover:shadow-md transition flex items-center gap-4">
          <LuMapPin className="w-6 h-6 text-gray-700" />
          <div>
            <h3 className="font-semibold">Location</h3>
            <p className="text-gray-600">{apartment.location}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
