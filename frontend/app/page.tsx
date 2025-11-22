"use client";

import { useEffect, useState } from "react";
import ApartmentCard from "./components/ApartmentCard";
import { API_BASE } from "../lib/api";

import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Apartment {
  id: number;
  name: string;
  unitnumber: string;
  project: string;
  price: number;
  description: string;
  imageurl: string;
}

export default function HomePage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [filtered, setFiltered] = useState<Apartment[]>([]);

  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [sort, setSort] = useState("");

 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6); 

  useEffect(() => {
    fetch(`${API_BASE}/apartments`)
      .then(res => res.json())
      .then(data => {
        setApartments(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let results = [...apartments];

    if (search) {
      results = results.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.unitnumber.toLowerCase().includes(search.toLowerCase()) ||
        a.project.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (projectFilter) {
      results = results.filter(a => a.project === projectFilter);
    }

    if (sort === "low") {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      results.sort((a, b) => b.price - a.price);
    }

    setFiltered(results);
    setCurrentPage(1); // Reset page on filter change
  }, [search, projectFilter, sort, apartments]);

  // Pagination handlers
  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

  const projectOptions = [...new Set(apartments.map(a => a.project))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find Your Next Home 🏡</h1>
          <p className="text-gray-500">Discover {apartments.length} properties available for you</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Search */}
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Input
                placeholder="Search by unit, name, project..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Project Filter */}
            <Select onValueChange={value => setProjectFilter(value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projectOptions.map((p, i) => (
                  <SelectItem key={i} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select onValueChange={value => setSort(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Price: Low → High</SelectItem>
                <SelectItem value="high">Price: High → Low</SelectItem>
              </SelectContent>
            </Select>

          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filtered.length}</span> results
          </p>

          {(search || projectFilter || sort) && (
            <button
              onClick={() => { setSearch(""); setProjectFilter(""); setSort(""); }}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              ✕ Clear filters
            </button>
          )}
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-1">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {paginatedData.map(apartment => (
                <ApartmentCard key={apartment.id} {...apartment} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-6">

              {/* Previous */}
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Prev
              </Button>

              {/* Page numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                );
              })}

              {/* Next */}
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
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
