import Banner from "components/Common/Banner";
import CarouselListItem from "components/Common/CarouselListItem";
import ItemBox from "components/Common/ItemBox";
import { Image } from "model/image";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { ImageService } from "services/image.service";
import { GetImageBannerDTO } from "shared/dto/image.dto";
import Container from "typedi";
import BaseLayout from "../components/Layout/BaseLayout/BaseLayout";
const fakeBanners = [
  {
    id: "1",
    name: "Ip 14 ra mắt nè",
    image:
      "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/690x300.png",
  },
  {
    id: "2",
    name: "Samsung galaxy ne",
    image:
      "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/sliding-th10-flip4-new1.png",
  },
  {
    id: "3",
    name: "Xiaomi ne",
    image:
      "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/12t-sliding-pre-order.png",
  },
];

const imageService = Container.get(ImageService);
const Home: NextPage = () => {
  const [banners, setBanners] = useState<Image[]>(fakeBanners);
  useEffect(() => {
    imageService
      .getBanner(new GetImageBannerDTO())
      .then((res) => {
        console.log(res);
        const {
          data: { data: data },
        } = res;
        setBanners(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <BaseLayout>
      <Banner data={banners} />
      <ItemBox />
      <CarouselListItem />
    </BaseLayout>
  );
};

export default Home;
