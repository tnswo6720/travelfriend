import { SliderItem, Wrapper } from "./LayoutBanner.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LayoutBannerUI(): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        <div>
          <SliderItem src="/images/layout/travel1.jpg" />
        </div>
        <div>
          <SliderItem src="/images/layout/travel2.jpg" />
        </div>
        <div>
          <SliderItem src="/images/layout/pc.jpg" />
        </div>
      </Slider>
    </Wrapper>
  );
}
