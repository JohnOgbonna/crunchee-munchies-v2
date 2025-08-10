// components/supporting_components/items/variantEditor.tsx

import React from 'react';
import { itemSizeVariation } from '@/app/typesAndInterfaces/orderTypes';
import { itemVariantEditableFields } from '@/app/data/itemEditableFields';

type Props = {
    variant: itemSizeVariation;
    onChange: (
        variantId: string,
        field: keyof itemSizeVariation,
        value: string | number | boolean
    ) => void;
    onSave: (id: string) => void;
    onCancel: (id: string) => void;
};

const VariantEditor = ({ variant, onChange, onSave, onCancel }: Props) => {
    const handleChange = (field: keyof itemSizeVariation) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value =
            e.target.type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : e.target.type === 'number'
                    ? Number(e.target.value)
                    : e.target.value;

        onChange(variant.id, field, value);
    };

    return (
        <div className="flex-1 space-y-3">
            {Object.entries(itemVariantEditableFields).map(([key, config]) => {
                const field = key as keyof itemSizeVariation;
                const value = variant[field] ?? '';
                const placeholder = config.placeholder ?? field;
                const label = config.label ?? field;

                const commonProps = {
                    key,
                    placeholder,
                    className: 'border rounded px-2 py-1 w-full text-sm',
                    onChange: handleChange(field),
                };

                return (
                    <div key={key} className={`mb-3 ${config.type === 'textarea' ? 'flex flex-col' : ''}`}>
                        {config.type === 'textarea' ? (
                            <textarea
                                {...commonProps}
                                defaultValue={String(value)}
                                rows={2}
                            />
                        ) : config.type === 'checkbox' ? (
                            <label className="flex items-center gap-2 text-xs">
                                <input
                                    type="checkbox"
                                    defaultChecked={!!value}
                                    onChange={handleChange(field)}
                                />
                                {label}
                            </label>
                        ) : (
                            <input
                                {...commonProps}
                                type={config.type}
                                defaultValue={String(value)}
                            />
                        )}
                        {config.type !== 'checkbox' && (
                            <p className="text-[10px] text-gray-500 mt-1">{label}</p>
                        )}
                    </div>
                );
            })}

            <div className="flex gap-2 mt-3">
                <button
                    className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                    onClick={() => onSave(variant.id)}
                >
                    Save
                </button>
                <button
                    className="text-xs text-slate-600 hover:underline"
                    onClick={() => onCancel(variant.id)}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default VariantEditor;