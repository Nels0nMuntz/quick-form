"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { FetchFormsResponse } from "@/entities/form";
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import { formatTableData } from "../lib/utils/formatTableData";
import { useTableDataQuery } from "../api/hooks/useTableDataQuery";

interface Props {
  initialData: FetchFormsResponse["forms"];
}

export function FormsTable({ initialData }: Props) {
  const { data = [] } = useTableDataQuery({
    skip: 0,
    take: 10,
    initialData: initialData,
  });
  const formattedItems = formatTableData(data);
  const table = useReactTable({
    columns: [
      {
        header: "Form Name",
        accessorKey: "name",
      },
      {
        header: "Last Updated",
        accessorKey: "updatedAt",
      },
      {
        header: "Form Link",
        accessorKey: "link",
        cell: (info) => (
          <Link
            href={`/form/${info.row.original.id}`}
            className="text-sky underline"
          >
            <div className="flex items-center gap-x-2">
              See more
              <Icon name="arrow-left" />
            </div>
          </Link>
        ),
      },
    ],
    data: formattedItems,
    getCoreRowModel: getCoreRowModel(),
  });
  const { getHeaderGroups, getRowModel } = table;
  return (
    <Table>
      <TableHeader>
        {getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
