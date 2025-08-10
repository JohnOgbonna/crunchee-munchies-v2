// data/itemEditableFields.ts

import { itemSizeVariation } from '@/app/typesAndInterfaces/orderTypes';

export type EditableFieldKey = keyof itemSizeVariation;

export type EditableFieldConfig = {
    type: 'text' | 'textarea' | 'number' | 'checkbox';
    placeholder?: string;
    colSpan?: number;
    label?: string;
};

export const itemVariantEditableFields: Record<string, EditableFieldConfig> = {
    name: {
    type: 'text',
    label: 'Name',
  },
  description: {
    type: 'textarea',
    label: 'Description',
  },
  price: {
    type: 'number',
    label: 'Price (USD)',
  },
  bundleSize: {
    type: 'number',
    placeholder: 'Bundle size',
    colSpan: 1,
    label: 'Bundle Size',
  },
  savings: {
    type: 'number',
    placeholder: 'Savings',
    colSpan: 1,
    label: 'Savings (USD)',
  },
  minimumQuantity: {
    type: 'number',
    placeholder: 'Min Qty',
    colSpan: 1,
    label: 'Minimum Quantity',
  },
  maximumQuantity: {
    type: 'number',
    placeholder: 'Max Qty',
    colSpan: 1,
    label: 'Maximum Quantity',
  },
  listOrder: {
    type: 'number',
    placeholder: 'List Order',
    colSpan: 1,
    label: 'Order in List',
  },
  pickupOnly: {
    type: 'checkbox',
    colSpan: 2,
    label: 'Pickup Only',
  },
};
