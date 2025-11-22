import Link from "next/link";
import Image from "next/image";
import { LuBedDouble, LuBath, LuRuler } from "react-icons/lu";

// Format date → “Posted 2 days ago”
function formatPostedDate(dateString: string) {
  const posted = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Posted today";
  if (diff === 1) return "Posted 1 day ago";
  return `Posted ${diff} days ago`;
}

interface ApartmentCardProps {
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
  date_posted: string;
}

export default function ApartmentCard({
  id,
  name,
  unitnumber,
  project,
  price,
  description,
  imageurl,
  bedrooms,
  bathrooms,
  area,
  date_posted,
}: ApartmentCardProps) {
  return (
    <Link href={`/apartment/${id}`}>
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 cursor-pointer hover:-translate-y-1">

        {/* Image */}
        <div className="w-full h-48 rounded-lg mb-4 overflow-hidden bg-gray-100">
          <Image
            src={
              imageurl ||
              "https://newcairo-developments.com/wp-content/uploads/2024/03/apartments-For-sale-in-Palm-Hills-Fifth-Settlement.jpg"
            }
            alt={name}
            width={600}
            height={400}
            unoptimized
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Project */}
        <div className="flex justify-between items-center mb-2">
          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
            {project}
          </span>

          {/* DATE POSTED */}
          <span className="text-xs text-gray-500">
            {formatPostedDate(date_posted)}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-1">{name}</h2>

        {/* Short description */}
        <p className="text-gray-500 text-sm line-clamp-1 mb-3">{description}</p>

        {/* ICON ROW */}
        <div className="flex items-center justify-between text-gray-600 text-sm mb-4 px-1">

          {/* Rooms */}
          <div className="flex items-center gap-2">
            <LuBedDouble className="w-5 h-5 text-gray-700" />
            <span>
              {bedrooms} {bedrooms === 1 ? "Room" : "Rooms"}
            </span>
          </div>

          {/* Bathrooms */}
          <div className="flex items-center gap-2">
            <LuBath className="w-5 h-5 text-gray-700" />
            <span>
              {bathrooms} {bathrooms === 1 ? "Bathroom" : "Bathrooms"}
            </span>
          </div>

          {/* Area */}
          <div className="flex items-center gap-2">
            <LuRuler className="w-5 h-5 text-gray-700" />
            <span>{area} m²</span>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <p className="font-bold text-lg text-gray-900">
            {price.toLocaleString()}{" "}
            <span className="text-sm font-normal text-gray-500">EGP</span>
          </p>

          <p className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
            Unit {unitnumber}
          </p>
        </div>

      </div>
    </Link>
  );
}
