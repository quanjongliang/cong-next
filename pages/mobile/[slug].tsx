import BaseLayout from "components/Layout/BaseLayout/BaseLayout";
import { useRouter } from "next/router";
import React from "react";

export default function MobileBySlug() {
  const { query } = useRouter();
  const { slug } = query;
  return <BaseLayout>MobileBySlug{slug}</BaseLayout>;
}
