import Banner, { IBannerData } from "components/Common/Banner";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { CloundinaryService } from "services/cloudinary.service";
import { GetBannerDTO } from "shared/dto/upload-banner.dto ";
import Container from "typedi";
import BaseLayout from "../components/Layout/BaseLayout/BaseLayout";
const fakeBanners = [
  {
    id: "1",
    label: "Ip 14 ra mắt nè",
    image:
      "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/690x300.png",
  },
  {
    id: "2",
    label: "Samsung galaxy ne",
    image:
      "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/sliding-th10-flip4-new1.png",
  },
  {
    id: "3",
    label: "Xiaomi ne",
    image:
      "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/12t-sliding-pre-order.png",
  },
];

const bannerService = Container.get(CloundinaryService);
const Home: NextPage = () => {
  const [banners, setBanners] = useState<IBannerData[]>(fakeBanners);
  useEffect(() => {
    const getAllBanner = async () => {
      try {
        const {
          data: { data },
        } = await bannerService.getBanner(new GetBannerDTO());
        setBanners(
          data.map((item) => ({
            id: item.public_id,
            image: item.url,
            label: item.original_filename,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    getAllBanner();
  }, []);
  return (
    <BaseLayout>
      <p>Hello</p>
      <Banner data={banners} />
    </BaseLayout>
  );
};

export default Home;
