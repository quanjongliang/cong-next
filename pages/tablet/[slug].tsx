import BaseLayout from "components/Layout/BaseLayout/BaseLayout";
import { useRouter } from "next/router";
import React from "react";

export default function TabletBySlug() {
  const { query } = useRouter();
  const { slug } = query;
  return <BaseLayout>TabletBySlug{slug}</BaseLayout>;
}
