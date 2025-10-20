"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./Button";

type Props = {
  onUpload: (url: string) => void;
};

export default function ImageUpload({ onUpload }: Props) {
  const supabase = createClientComponentClient();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      onUpload(data.publicUrl);
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="file-input">
        <Button
          type="button"
          className="cursor-pointer bg-cyan-600 hover:bg-cyan-700"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      </label>

      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
