import React from 'react'
import UIHeader from '../components/organism/UIHeader'
import UIBannerPrincipal from '../components/organism/UIBannerPrincipal'
import UICardScroll from '../components/organism/UICardScroll'




import UIFooter from '../components/organism/UIFooter'

const PageHomeOut = () => {
  return (
    <>
      <UIHeader />
      <UIBannerPrincipal />
      <UICardScroll />

      <UIFooter variante="oscuro"/>

    </>
  )
}

export default PageHomeOut
