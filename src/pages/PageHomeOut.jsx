import React from 'react'
import UIHeader from '../components/organism/UIHeader'
import UIBannerPrincipal from '../components/organism/UIBannerPrincipal'
import UICardScroll from '../components/organism/UICardScroll'

import UIFooter from '../components/organism/UIFooter'
import UIMediaPlayer from '../components/organism/UIMediaPlayer'

const PageHomeOut = () => {
  return (
    <>
      <UIHeader />
      <UIBannerPrincipal />
      <UICardScroll />
      <UIMediaPlayer />

      <UIFooter variante="minimal"/>

    </>
  )
}

export default PageHomeOut
