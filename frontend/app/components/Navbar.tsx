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
    bedrooms: "",
    bathrooms: "",
    area: "",
    location: "",
    imageurl: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<any>({});

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, imageurl: preview }));
  };


const validate = () => {
  const newErrors: any = {};

  if (!form.name.trim()) newErrors.name = "Name is required.";
  if (!form.unitnumber.trim()) newErrors.unitnumber = "Unit number is required.";
  if (!form.project.trim()) newErrors.project = "Project is required.";

 
  if (!form.price.trim()) {
    newErrors.price = "Price is required.";
  } else {
    const val = Number(form.price);
    if (val < 500000) newErrors.price = "Price must be at least 500,000 EGP.";
    else if (val > 30000000)
      newErrors.price = "Price cannot exceed 30,000,000 EGP.";
  }

  if (!form.description.trim()) newErrors.description = "Description is required.";

  if (!form.bedrooms.trim()) {
    newErrors.bedrooms = "Bedrooms is required.";
  } else {
    const val = Number(form.bedrooms);
    if (val < 1) newErrors.bedrooms = "Bedrooms must be at least 1.";
    else if (val > 4) newErrors.bedrooms = "Bedrooms cannot exceed 4.";
  }

  if (!form.bathrooms.trim()) {
    newErrors.bathrooms = "Bathrooms is required.";
  } else {
    const val = Number(form.bathrooms);
    if (val < 1) newErrors.bathrooms = "Bathrooms must be at least 1.";
    else if (val > 4) newErrors.bathrooms = "Bathrooms cannot exceed 4.";
  }

  if (!form.area.trim()) {
    newErrors.area = "Area is required.";
  } else {
    const val = Number(form.area);
    if (val < 20) newErrors.area = "Area must be at least 20 m².";
    else if (val > 2000) newErrors.area = "Area cannot exceed 2000 m².";
  }

  if (!form.location.trim()) newErrors.location = "Location is required.";

  if (!selectedFile) newErrors.imageurl = "Image is required.";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("unitnumber", form.unitnumber);
    formData.append("project", form.project);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("bedrooms", form.bedrooms);
    formData.append("bathrooms", form.bathrooms);
    formData.append("area", form.area);
    formData.append("location", form.location);

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

    setSuccessDialogOpen(true);

    setForm({
      name: "",
      unitnumber: "",
      project: "",
      price: "",
      description: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      location: "",
      imageurl: "",
    });
    setSelectedFile(null);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/nawy-removebg-preview.png"
            alt="Logo"
            width={212}
            height={202}
            className="rounded-md"
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* ADD Apartment FORM */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
              variant="outline"
              className="font-medium px-3 py-2 text-sm md:px-4 md:py-2 md:text-base rounded-full border border-gray-300 hover:bg-gray-100 transition">
                Add Your Apartment
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Add New Apartment
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* NAME */}
                <Field label="Name" error={errors.name}>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </Field>

                {/* UNIT */}
                <Field label="Unit Number" error={errors.unitnumber}>
                  <Input
                    value={form.unitnumber}
                    onChange={(e) =>
                      setForm({ ...form, unitnumber: e.target.value })
                    }
                  />
                </Field>

                {/* PROJECT */}
                <Field label="Project" error={errors.project}>
                  <Input
                    value={form.project}
                    onChange={(e) =>
                      setForm({ ...form, project: e.target.value })
                    }
                  />
                </Field>

                {/* PRICE */}
                <Field label="Price (EGP)" error={errors.price}>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                  />
                </Field>

                {/* BEDROOMS */}
                <Field label="Bedrooms" error={errors.bedrooms}>
                  <Input
                    type="number"
                    value={form.bedrooms}
                    onChange={(e) =>
                      setForm({ ...form, bedrooms: e.target.value })
                    }
                  />
                </Field>

                {/* BATHROOMS */}
                <Field label="Bathrooms" error={errors.bathrooms}>
                  <Input
                    type="number"
                    value={form.bathrooms}
                    onChange={(e) =>
                      setForm({ ...form, bathrooms: e.target.value })
                    }
                  />
                </Field>

                {/* AREA */}
                <Field label="Area (m²)" error={errors.area}>
                  <Input
                    type="number"
                    value={form.area}
                    onChange={(e) =>
                      setForm({ ...form, area: e.target.value })
                    }
                  />
                </Field>

                {/* LOCATION */}
                <Field label="Location" error={errors.location}>
                  <Input
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                  />
                </Field>

                {/* DESCRIPTION */}
                <Field label="Description" error={errors.description}>
                  <Textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </Field>

                {/* IMAGE */}
                <Field label="Image" error={errors.imageurl}>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} />
                </Field>

                {/* PREVIEW */}
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

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
