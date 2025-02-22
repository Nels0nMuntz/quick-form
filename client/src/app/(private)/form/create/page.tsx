import { Metadata } from "next";
import { CreateFormPage } from "@/views/create-form";

export const metadata: Metadata = {
  title: "New Form - Quick Form",
};

export default function CreateForm() {
  return <CreateFormPage />;
}
