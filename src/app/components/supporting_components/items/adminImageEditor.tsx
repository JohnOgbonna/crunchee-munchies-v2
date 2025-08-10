import { useState } from 'react';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
import { toast } from 'sonner';

type AdminItemImageEditorProps = {
  currentImageUrl: string;
  itemId: string;
  isEditing: boolean;
  onImageUploadSuccess: (url: string) => void;
};

const AdminItemImageEditor = ({
  currentImageUrl,
  itemId,
  isEditing,
  onImageUploadSuccess,
}: AdminItemImageEditorProps) => {
  const [preview, setPreview] = useState(currentImageUrl);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      const ext = file.name.split('.').pop();
      const fileName = `${itemId}.${ext}`;

      const res = await fetch(`/api/getUploadUrl?fileName=${fileName}&type=${file.type}`);
      const { uploadUrl, publicUrl } = await res.json();

      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: compressedFile,
      });

      setPreview(publicUrl);
      onImageUploadSuccess(publicUrl);
      toast.success('Image uploaded successfully!');
    } catch (error: any) {
      toast.error(`Image upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {preview ? (
        <Image
          src={preview}
          alt="Item image"
          width={320}
          height={300}
          className="object-contain sm:max-h-[200px] md:max-h-[150px] w-auto h-auto max-w-full"
        />
      ) : (
        <div className="w-full h-40 flex items-center justify-center text-sm text-slate-400">
          No Image
        </div>
      )}

      {isEditing && (
        <label className="text-sm font-semibold text-blue-600 cursor-pointer underline">
          {isUploading ? 'Uploading...' : 'Change Image'}
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </label>
      )}
    </div>
  );
};

export default AdminItemImageEditor;
