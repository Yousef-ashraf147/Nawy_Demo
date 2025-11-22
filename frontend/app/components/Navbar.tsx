"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE } from "@/lib/api";

export default function Navbar() {
  const [form, setForm] = useState({
    name: "",
    unitnumber: "",
    project: "",
    price: "",
    description: "",
    imageurl: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [errors, setErrors] = useState({
    name: "",
    unitnumber: "",
    project: "",
    price: "",
    description: "",
    imageurl: "",
  });

  // success dialog state
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  // Handle image input
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const preview = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, imageurl: preview }));
  };

  // Validation
  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.unitnumber.trim()) newErrors.unitnumber = "Unit number is required.";
    if (!form.project.trim()) newErrors.project = "Project is required.";

    if (!form.price.trim()) newErrors.price = "Price is required.";
    else if (Number(form.price) <= 0)
      newErrors.price = "Price must be greater than 0.";

    if (!form.description.trim())
      newErrors.description = "Description is required.";

    if (!selectedFile) newErrors.imageurl = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Form
  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("unitnumber", form.unitnumber);
    formData.append("project", form.project);
    formData.append("price", form.price);
    formData.append("description", form.description);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    const res = await fetch(`${API_BASE}/apartments`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      setSuccessDialogOpen(true);
      return;
    }

    // Show success dialog
    setSuccessDialogOpen(true);

    // Reset form inputs
    setForm({
      name: "",
      unitnumber: "",
      project: "",
      price: "",
      description: "",
      imageurl: "",
    });
    setSelectedFile(null);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/nawy-removebg-preview.png"
            alt="Logo"
            width={212}
            height={202}
            className="rounded-md"
          />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* ADD APARTMENT FORM DIALOG */}
          <Dialog>
            <DialogTrigger asChild>
<button className="hidden md:block font-medium px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
                Add Your Apartment
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Add New Apartment
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">

                {/* NAME */}
                <div>
                  <Label>Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                {/* UNIT NUMBER */}
                <div>
                  <Label>Unit Number</Label>
                  <Input
                    value={form.unitnumber}
                    onChange={(e) =>
                      setForm({ ...form, unitnumber: e.target.value })
                    }
                    className={errors.unitnumber ? "border-red-500" : ""}
                  />
                  {errors.unitnumber && (
                    <p className="text-red-500 text-sm">{errors.unitnumber}</p>
                  )}
                </div>

                {/* PROJECT */}
                <div>
                  <Label>Project</Label>
                  <Input
                    value={form.project}
                    onChange={(e) =>
                      setForm({ ...form, project: e.target.value })
                    }
                    className={errors.project ? "border-red-500" : ""}
                  />
                  {errors.project && (
                    <p className="text-red-500 text-sm">{errors.project}</p>
                  )}
                </div>

                {/* PRICE */}
                <div>
                  <Label>Price (EGP)</Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
                </div>

                {/* DESCRIPTION */}
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>

                {/* IMAGE */}
                <div>
                  <Label>Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={errors.imageurl ? "border-red-500" : ""}
                  />
                  {errors.imageurl && (
                    <p className="text-red-500 text-sm">{errors.imageurl}</p>
                  )}
                </div>

                {form.imageurl && (
                  <img
                    src={form.imageurl}
                    className="w-full h-52 object-cover rounded-xl"
                  />
                )}

                <Button className="w-full mt-4" onClick={handleSubmit}>
                  Add Apartment
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* SUCCESS CONFIRMATION DIALOG */}
          <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
            <DialogContent className="max-w-md text-center">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-green-600">
                  Apartment Added Successfully!
                </DialogTitle>
              </DialogHeader>

              <p className="text-gray-600 mt-2">
                Your apartment has been added to the listing.
              </p>

              <Button
                className="mt-6 w-full"
                onClick={() => {
                  setSuccessDialogOpen(false);
                  window.location.reload();
                }}
              >
                Close
              </Button>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </nav>
  );
}
