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
import { Pencil } from "lucide-react";
import { FetchFormResponse } from "@/entities/form";
import {
  Button,
  CopyLink,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import { useOriginUrl } from "@/shared/lib";
import { DeleteFormDialog } from "@/features/form";
import { formatTableData } from "../lib/utils/formatTableData";
import { useTableDataQuery } from "../api/hooks/useTableDataQuery";
import { useStatsQuery } from "../api/hooks/useStatsQuery";
import { useLoadingState } from "../api/hooks/useLoadingState";

export function FormsTable() {
  const router = useRouter();
  const {
    data: forms = [],
    isLoading: isLoadingForms,
    refetch,
  } = useTableDataQuery({
    take: 10,
    skip: 0,
  });
  const { data: stats = {}, isLoading: isLoadingStats } = useStatsQuery(
    forms.map(({ id }) => id),
  );
  
  const isLoading = useLoadingState([isLoadingForms, isLoadingStats]);
  const originUrl = useOriginUrl();

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
        header: () => (
          <div className="text-center">Responses</div>
        ),
        accessorKey: "responsesCount",
        cell: (info) => (
          <div className="text-center">
            <Link
              href={`/responses/${info.row.original.id}`}
              className="px-2 py-1 text-sky/85"
              aria-label="Responses count"
            >
              {info.getValue()}
            </Link>
          </div>
        ),
      },
      {
        header: () => (
          <div className="text-center">Share Link</div>
        ),
        accessorKey: "link",
        cell: (info) => (
          <div className="text-center">
            <CopyLink
              link={`${originUrl}/public-form/${info.row.original.slug}`}
            />
          </div>
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
    [originUrl],
  );
  const formattedItems = useMemo(
    () => formatTableData(forms, stats),
    [forms, stats],
  );
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

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }
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
