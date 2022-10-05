import BaseLayout from "components/Layout/BaseLayout/BaseLayout";
import { useRouter } from "next/router";
import React from "react";

export default function OtherBySlug() {
  const { query } = useRouter();
  const { slug } = query;
  return <BaseLayout>OtherBySlug{slug}</BaseLayout>;
}
