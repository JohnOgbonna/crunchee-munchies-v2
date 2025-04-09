'use client';

import { useRouter } from 'next/navigation';
import { OrderTableProps, OrderType, TableInstanceWithPagination } from '@/app/typesAndInterfaces/orderTypes';
import React from 'react';
import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import { getOrderColumns } from './orderColumns';
import {
    useTable,
    usePagination,
    useSortBy,
    TableInstance,
    UsePaginationState,
    UsePaginationInstanceProps,
    Column,
} from 'react-table';


const OrderTable: React.FC<OrderTableProps> = ({
    orders,
    loading,
    setPageSize,
}) => {
    const router = useRouter();
    const columns: Column<OrderType>[] = React.useMemo(() => getOrderColumns(router), [router]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize: setTablePageSize,
        state: { pageIndex: currentPageIndex, pageSize: currentPageSize },
    } = useTable<OrderType>(
        {
            columns,
            data: orders,
            initialState: {},
        },
        useSortBy,
        usePagination
    ) as TableInstanceWithPagination<OrderType>;

    return (
        <div className="bg-[#fff9f2] text-slate-800 md:p-4">
            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <>
                    <div className="overflow-x-auto sm:text-[12px]">
                        <table
                            {...getTableProps()}
                            className="w-full table-auto border-collapse min-w-[600px]"
                        >
                            <thead className="bg-slate-100">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                // @ts-ignore: Suppress TypeScript error for getSortByToggleProps
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className="px-4 py-3 border-b text-left md:text-sm font-medium text-slate-700 whitespace-nowrap cursor-pointer"
                                            >
                                                <div className="flex items-center gap-1">
                                                    {column.render('Header')}
                                                    {/* @ts-ignore: Suppress TypeScript error for disableSortBy */}
                                                    {!column.disableSortBy && (
                                                        <>
                                                            {/* @ts-ignore: Suppress TypeScript error for isSorted and isSortedDesc */}
                                                            {column.isSorted ? {/* @ts-ignore: */}(
                                                                column.isSortedDesc ? (
                                                                    <ArrowDown size={14} />
                                                                ) : (
                                                                    <ArrowUp size={14} />
                                                                )
                                                            ) : (
                                                                <ChevronsUpDown size={14} className="text-slate-400" />
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps()}
                                            className="hover:bg-slate-50 transition"
                                        >
                                            {row.cells.map(cell => (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-4 py-3 border-b md:text-sm whitespace-nowrap"
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-6 flex flex-col md:flex-row md:justify-between items-center gap-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                                className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                                className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>

                        <div className="text-sm">
                            Page{' '}
                            <strong>
                                {currentPageIndex + 1} of {pageOptions.length}
                            </strong>
                        </div>
                        <select
                            value={currentPageSize}
                            onChange={(e) => {
                                const size = Number(e.target.value);
                                setTablePageSize(size);
                                setPageSize(size);
                            }}
                            className="px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                        >
                            {[1, 2, 3, 4].map((size) => (
                                <option key={size} value={size}>
                                    Show {size}
                                </option>
                            ))}
                        </select>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderTable;
