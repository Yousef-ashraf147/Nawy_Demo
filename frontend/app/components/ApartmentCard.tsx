import Link from "next/link";
import Image from "next/image";

interface ApartmentCardProps {
  id: number;
  name: string;
  unitnumber: string;
  project: string;
  price: number;
  description: string;
  imageurl: string;
}

export default function ApartmentCard({
  id,
  name,
  unitnumber,
  project,
  price,
  description,
  imageurl,
}: ApartmentCardProps) {
  return (
    <Link href={`/apartment/${id}`}>
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 cursor-pointer hover:-translate-y-1">
        
        {/* Image */}
        <div className="w-full h-48 rounded-lg mb-4 overflow-hidden bg-gray-100">
          <Image
            src={imageurl || "https://newcairo-developments.com/wp-content/uploads/2024/03/apartments-For-sale-in-Palm-Hills-Fifth-Settlement.jpg"}
            alt={name}
            width={600}
            height={400}
            unoptimized
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Project badge */}
        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md mb-2">
          {project}
        </span>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-1">{name}</h2>
        
        {/* Description preview */}
        <p className="text-gray-500 text-sm line-clamp-1 mb-3">{description}</p>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <p className="font-bold text-lg text-gray-900">
            {price.toLocaleString()} <span className="text-sm font-normal text-gray-500">EGP</span>
          </p>
          <p className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
            Unit {unitnumber}
          </p>
        </div>

      </div>
    </Link>
  );
}
