"use client";
import React, { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form } from "@/entities/form";
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
import { DeleteFormButton } from "@/features/form";
import { useTableDataQuery } from "../api/hooks/useTableDataQuery";

export function FormsTable() {
  const router = useRouter();
  const { data = [], refetch } = useTableDataQuery({
    take: 10,
    skip: 0,
  });
  const columns: ColumnDef<Form, any>[] = useMemo(
    () => [
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
      {
        header: "",
        accessorKey: "delete",
        cell: (info) => (
          <DeleteFormButton
            formId={info.row.original.id}
            onSuccess={() => {
              refetch();
              router.refresh();
            }}
          />
        ),
      },
    ],
    [],
  );
  const formattedItems = useMemo(() => formatTableData(data), [data]);
  const table = useReactTable({
    columns: columns,
    data: formattedItems,
    getCoreRowModel: getCoreRowModel(),
  });
  const headerGroups = useMemo(
    () => table.getHeaderGroups(),
    [table, formattedItems],
  );
  const rows = useMemo(() => table.getRowModel().rows, [table, formattedItems]);
  return (
    <React.Fragment>
      <Table>
        <TableHeader>
          {headerGroups.map((headerGroup) => (
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
          {rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-sky/10">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
