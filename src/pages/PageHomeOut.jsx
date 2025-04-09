import React from "react";
import UIHeader from "../components/organism/UIHeader";
import UIBannerPrincipal from "../components/organism/UIBannerPrincipal";
import UICardScroll from "../components/organism/UICardScroll";

import UIFooter from "../components/organism/UIFooter";
import UIMediaPlayer from "../components/organism/UIMediaPlayer";
import UIButtonIcon from "../components/organism/UIButtonIcon";
import UISliderImage from "../components/organism/UISliderImage";
import UICardsImageSlider from "../components/organism/UICardsImageSlider";
import UICardImage from "../components/organism/UICardImage";
import UIGallery from "../components/organism/UIGallery";
import UIBarMusic from "../components/organism/UIBarMusic";

const PageHomeOut = () => {
  return (
    <>
      <UIBannerPrincipal />
      {/* <UIMediaPlayer /> */}

      {/* <UISliderImage /> */}
      <UICardsImageSlider />

      <UICardImage
        cards={
          [
            {
              imageUrl: 'https://placehold.co/600x400/000000/ffffff?text=Apple+Watch',
              title: 'Apple Watch Series 10',
              subtitle: 'Delgado. Estilizado. Avanzado.',
              cta: 'Más información'
            },
            {
              imageUrl: 'https://placehold.co/600x400/0af/fff?text=iPad+Air+M3',
              title: 'iPad Air',
              subtitle: 'Ahora con los superpoderes del chip M3.',
              cta: 'Más información'
            },
            {
              imageUrl: 'https://placehold.co/600x400/0af/fff?text=iPad+Air+M3',
              title: 'iPad Air',
              subtitle: 'Ahora con los superpoderes del chip M3.',
              cta: 'Más información'
            }
          ]
          
        }
      />

      <UIGallery />

      {/* <UICardScroll /> */}

      <UIButtonIcon />

      <UIBarMusic />
    </>
  );
};

export default PageHomeOut;
