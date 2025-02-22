import { Metadata } from "next";
import { PreviewFormPage } from "@/views/preview-form";

export const metadata: Metadata = {
  title: "Preview Form - Quick Form",
};

export default function PreviewForm() {
  return <PreviewFormPage />;
}
