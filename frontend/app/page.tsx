"use client";

import { useEffect, useState } from "react";
import ApartmentCard from "./components/ApartmentCard";
import { API_BASE } from "../lib/api";

import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

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
  }, [search, projectFilter, sort, apartments]);

  const projectOptions = [...new Set(apartments.map(a => a.project))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find Your Next Home 🏡</h1>
          <p className="text-gray-500">
            Discover {apartments.length} properties available for you
          </p>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search */}
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">{filtered.length}</span> results
          </p>
          {(search || projectFilter || sort) && (
            <button
              onClick={() => { setSearch(""); setProjectFilter(""); setSort(""); }}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          )}
        </div>

        {/* Listing Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(apartment => (
              <ApartmentCard key={apartment.id} {...apartment} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}