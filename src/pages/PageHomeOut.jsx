import React from "react";
import UIBannerPrincipal from "../components/organism/UIBannerPrincipal";
import UIButtonIcon from "../components/organism/UIButtonIcon";
import UICardsImageSlider from "../components/organism/UICardsImageSlider";
import UICardImage from "../components/organism/UICardImage";
import UIGallery from "../components/organism/UIGallery";

const PageHomeOut = () => {
  return (
    <>
      <UIBannerPrincipal />
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
      <UIButtonIcon />
    </>
  );
};

export default PageHomeOut;
