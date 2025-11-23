"use client";

import { useEffect, useState } from "react";
import ApartmentCard from "./components/ApartmentCard";
import { API_BASE } from "../lib/api";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

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
  date_posted: string; 
}


export default function HomePage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [filtered, setFiltered] = useState<Apartment[]>([]);

  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [bedFilter, setBedFilter] = useState("");
  const [bathFilter, setBathFilter] = useState("");
  const [sort, setSort] = useState("");

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Fetch apartments
  useEffect(() => {
    fetch(`${API_BASE}/apartments`)
      .then((res) => res.json())
      .then((data: Apartment[]) => {
        setApartments(data);
        setFiltered(data);

        const minP = Math.min(...data.map((a) => a.price));
        const maxP = Math.max(...data.map((a) => a.price));

        setMinPrice(minP);
        setMaxPrice(maxP);
        setPriceRange([minP, maxP]);
      });
  }, []);

  // Filtering + Sorting
  useEffect(() => {
    let results = [...apartments];

    if (search) {
      results = results.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.unitnumber.toLowerCase().includes(search.toLowerCase()) ||
          a.project.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (projectFilter) {
      results = results.filter((a) => a.project === projectFilter);
    }

    if (bedFilter && bedFilter !== "any") {
      results = results.filter((a) => a.bedrooms === Number(bedFilter));
    }

    if (bathFilter && bathFilter !== "any") {
      results = results.filter((a) => a.bathrooms === Number(bathFilter));
    }

    results = results.filter(
      (a) => a.price >= priceRange[0] && a.price <= priceRange[1]
    );

    // Sorting
    if (sort === "low") {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === "area-low") {
      results.sort((a, b) => a.area - b.area);
    } else if (sort === "area-high") {
      results.sort((a, b) => b.area - a.area);
    } else if (sort === "newest") {
      results.sort(
        (a, b) =>
          new Date(b.date_posted).getTime() -
          new Date(a.date_posted).getTime()
      );
    } else if (sort === "oldest") {
      results.sort(
        (a, b) =>
          new Date(a.date_posted).getTime() -
          new Date(b.date_posted).getTime()
      );
    }

    setFiltered(results);
    setCurrentPage(1);
  }, [
    search,
    projectFilter,
    bedFilter,
    bathFilter,
    priceRange,
    sort,
    apartments,
  ]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

  const projectOptions = [...new Set(apartments.map((a) => a.project))];

  if (minPrice === 0 && maxPrice === 0) {
    return <div className="h-40" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find Your Next Home 🏡</h1>
          <p className="text-gray-500">
            Discover {apartments.length} properties available for you
          </p>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Search */}
            <Input
              placeholder="Search by unit, name, project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Bedrooms */}
            <Select value={bedFilter} onValueChange={setBedFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4 Bedrooms</SelectItem>
              </SelectContent>
            </Select>

            {/* Bathrooms */}
            <Select value={bathFilter} onValueChange={setBathFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1 Bathroom</SelectItem>
                <SelectItem value="2">2 Bathrooms</SelectItem>
                <SelectItem value="3">3 Bathrooms</SelectItem>
                <SelectItem value="4">4 Bathrooms</SelectItem>
              </SelectContent>
            </Select>

            {/* Project */}
            <Select
              value={projectFilter || "all"}
              onValueChange={(value) =>
                setProjectFilter(value === "all" ? "" : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projectOptions.map((p, i) => (
                  <SelectItem key={i} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Price: Low → High</SelectItem>
                <SelectItem value="high">Price: High → Low</SelectItem>
                <SelectItem value="area-low">Area: Small → Large</SelectItem>
                <SelectItem value="area-high">Area: Large → Small</SelectItem>

                {/* DATE SORT OPTIONS */}
                <SelectItem value="newest">Date: Newest First</SelectItem>
                <SelectItem value="oldest">Date: Oldest First</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Slider */}
            <div className="col-span-1 flex flex-col items-center text-center">
              <p className="font-medium mb-2 text-gray-700">
                Price Range: {priceRange[0].toLocaleString()} EGP —{" "}
                {priceRange[1].toLocaleString()} EGP
              </p>

              <Slider
                value={priceRange}
                min={minPrice}
                max={maxPrice}
                defaultValue={[minPrice, maxPrice]}
                onValueChange={(v) => setPriceRange([v[0], v[1]])}
                step={50000}
                className="w-full max-w-xs"
              />
            </div>
          </div>
        </div>

        {/* CLEAR FILTERS BUTTON */}
        {(search ||
          projectFilter ||
          bedFilter ||
          bathFilter ||
          sort ||
          priceRange[0] !== minPrice ||
          priceRange[1] !== maxPrice) && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => {
                setSearch("");
                setProjectFilter("");
                setSort("");
                setBedFilter("");
                setBathFilter("");
                setPriceRange([minPrice, maxPrice]);
              }}
              className="px-4 py-2 text-sm rounded-full border border-gray-300 hover:bg-gray-100 transition text-gray-600"
            >
              ✕ Clear filters
            </button>
          </div>
        )}

        {/* CARDS */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <h3 className="text-lg font-medium text-gray-900">
              No properties found
            </h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {paginatedData.map((apartment) => (
                <ApartmentCard key={apartment.id} {...apartment} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </Button>

              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                  className="w-10"
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
