//components/supporting_components/items/adminItemVariants.tsx
'use client';

'use client';

import { itemSizeVariation } from '@/app/typesAndInterfaces/orderTypes';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import VariantEditor from './variantEditor';
import { updateItemVariantInDb } from '@/app/lib/db/updateItemVariantInDatabase'; // ✅ Import your server action
import { toast } from 'sonner';
import { ItemVariantUpdate } from '@/app/typesAndInterfaces/orderTypes';
import { set } from 'zod';

type AdminItemVariantsProps = {
  variants: itemSizeVariation[] | null | undefined;
};

const AdminItemVariants = ({ variants }: AdminItemVariantsProps) => {
  const [editStates, setEditStates] = useState<Record<string, boolean>>({});
  const [editedVariants, setEditedVariants] = useState<Record<string, Partial<itemSizeVariation>>>({});
  const [_savingStates, setSavingStates] = useState<Record<string, boolean>>({});
  const [variantList, setVariantList] = useState<itemSizeVariation[]>(() => variants || []);

  if (!variants || variants.length === 0) {
    return <p className="text-sm text-slate-500 italic">No variants available.</p>;
  }

  const sortedVariants = useMemo(
    () => [...variantList].sort((a, b) => (a.listOrder || 0) - (b.listOrder || 0)),
    [variants, variantList]
  );

  const toggleEdit = (id: string) => {
    setEditStates((prev) => ({ ...prev, [id]: !prev[id] }));
    setEditedVariants((prev) => ({ ...prev, [id]: {} }));
  };

  const handleFieldChange = (
    id: string,
    field: keyof itemSizeVariation,
    value: string | number | boolean
  ) => {
    const parsedValue =
      ['price', 'bundleSize', 'savings', 'minimumQuantity', 'maximumQuantity', 'listOrder'].includes(field)
        ? parseFloat(value as string)
        : value;

    setEditedVariants((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: parsedValue,
      },
    }));
  };

  const handleCancel = (id: string) => {
    toggleEdit(id);
  };
  const handleSave = async (id: string) => {
    const edited = editedVariants[id];
    const original = sortedVariants.find(v => v.id === id);

    if (!edited || !original) {
      toggleEdit(id);
      return;
    }

    // Merge old + new
    const merged = { ...original, ...edited };

    const updates: ItemVariantUpdate = {
      name: merged.name,
      description: merged.description,
      price: merged.price,
      bundleSize: merged.bundleSize,
      savings: merged.savings,
      minimum_quantity: merged.minimumQuantity,
      maximum_quantity: merged.maximumQuantity,
      list_order: merged.listOrder,
      pickup_only: merged.pickupOnly,
    };

    try {
      setSavingStates(prev => ({ ...prev, [id]: true }));
      await updateItemVariantInDb(id, updates);

      setVariantList(prev => prev.map(v => v.id === id ? merged : v));
      toast.success(`Variant ${updates.name || id} saved successfully!`);
      toggleEdit(id);
    } catch (err) {
      console.error('Error saving variant:', err);
      toast.error(`Failed to save ${updates.name || 'variant'}`);
    } finally {
      setSavingStates(prev => ({ ...prev, [id]: false }));
    }
  };


  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
      {sortedVariants.map((variant) => {
        const isEditing = editStates[variant.id] || false;

        return (
          <div
            key={variant.id}
            className="border rounded-md p-3 bg-slate-50 w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.66rem)]"
          >
            <div className="flex gap-3">
              <div className="w-20 h-20 relative rounded overflow-hidden">
                {variant.url ? (
                  <Image
                    src={variant.url}
                    alt={variant.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                ) : (
                  <div className="bg-gray-100 w-full h-full flex items-center justify-center text-xs text-slate-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1">
                {isEditing ? (
                  <VariantEditor
                    onChange={handleFieldChange}
                    variant={variant}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  />
                ) : (
                  <>
                    <h3 className="text-base font-medium text-slate-700">{variant.name}</h3>
                    <p className="text-sm text-slate-600">{variant.description}</p>
                    <p className="text-sm text-slate-700 font-semibold">
                      ${variant.price.toFixed(2)}
                      {variant.pickupOnly && (
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                          Pickup Only
                        </span>
                      )}
                    </p>
                    <button
                      className="text-xs text-blue-600 hover:underline mt-1"
                      onClick={() => toggleEdit(variant.id)}
                    >
                      Edit Variant
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminItemVariants;
