// app/components/supporting_components/items/adminItemVariants.tsx

import { itemSizeVariation } from '@/app/typesAndInterfaces/orderTypes';
import Image from 'next/image';

type AdminItemVariantsProps = {
  variants: itemSizeVariation[] | null | undefined;
};

const AdminItemVariants = ({ variants }: AdminItemVariantsProps) => {
  if (!variants || variants.length === 0) {
    return <p className="text-sm text-slate-500 italic">No variants available.</p>;
  }

  const sortedVariants = [...variants].sort((a, b) => (a.listOrder || 0) - (b.listOrder || 0));

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
      {sortedVariants.map((variant) => (
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

            <div className="flex-1">
              <h3 className="text-base font-medium text-slate-700">{variant.name}</h3>
              <p className="text-sm text-slate-600">{variant.description}</p>
              <p className="text-sm text-slate-700 font-semibold">
                ${variant.price}
                {variant.pickupOnly && (
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                    Pickup Only
                  </span>
                )}
              </p>
              <button className="text-xs text-blue-600 hover:underline mt-1">Edit Variant</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminItemVariants;
