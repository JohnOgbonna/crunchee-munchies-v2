// components/orderColumns.ts

import { Column } from 'react-table';
import { OrderType } from '@/app/typesAndInterfaces/orderTypes';
import { useRouter } from 'next/navigation';

export const getOrderColumns = (router: ReturnType<typeof useRouter>): Column<OrderType>[] => [
  {
    Header: 'Order ID',
    accessor: 'id',
    // @ts-ignore: Suppress TypeScript error for disableSortBy
    disableSortBy: true,
  },
  {
    Header: 'Action',
    // @ts-ignore: Suppress TypeScript error for disableSortBy
    disableSortBy: true,
    Cell: ({ row }: any) => (
      <button
        className="text-blue-500"
        onClick={() => router.push(`/admin/orders/${row.original.id}`)}
      >
        View Details
      </button>
    ),
  },
  {
    Header: 'Customer Name',
    accessor: 'customer_name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Created At',
    accessor: 'created_at',
  },
  {
    Header: 'Paid',
    accessor: 'paid',
    Cell: ({ value }) => (value === true ? 'Yes' : 'No'),
  },
  {
    Header: 'Needs Delivery',
    accessor: 'needs_delivery',
    Cell: ({ value }) => (value === true ? 'Yes' : 'No'),
  },
];
