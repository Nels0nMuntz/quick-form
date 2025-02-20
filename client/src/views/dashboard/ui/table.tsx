"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { FetchFormResponse } from "@/entities/form";
import {
  Button,
  CopyLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import { formatTableData } from "../lib/utils/formatTableData";
import { DeleteFormDialog } from "@/features/form";
import { useTableDataQuery } from "../api/hooks/useTableDataQuery";

export function FormsTable() {
  const router = useRouter();
  const { data = [], refetch } = useTableDataQuery({
    take: 10,
    skip: 0,
  });
  const [urlOrigin, setUrlOrigin] = useState("");
  useEffect(() => {
    setUrlOrigin(window.location.origin);
  }, []);
  const columns: ColumnDef<FetchFormResponse, any>[] = useMemo(
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
          <CopyLink
            link={`${urlOrigin}/public-form/${info.row.original.slug}`}
          />
        ),
      },
      {
        header: "",
        accessorKey: "delete",
        cell: (info) => (
          <div className="flex gap-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/form/${info.row.original.id}`)}
            >
              <Pencil className="text-sky/85" />
            </Button>
            <DeleteFormDialog
              formId={info.row.original.id}
              formName={info.row.original.name}
              onSuccess={() => {
                refetch();
                router.refresh();
              }}
            />
          </div>
        ),
      },
    ],
    [],
  );
  const formattedItems = useMemo(() => formatTableData(data), [data]);
  const table = useReactTable<FetchFormResponse>({
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
