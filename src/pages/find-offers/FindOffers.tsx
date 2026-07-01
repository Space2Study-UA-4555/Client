import { useState } from 'react'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OffersToggle from '~/containers/find-offer/offers-toggle/OffersToggle'
import { useAppSelector } from '~/hooks/use-redux'
import { UserRoleEnum } from '~/types'

const FindOffers = () => {
  const { userRole } = useAppSelector((state) => state.appMain)

  const [isTutorsOffers, setIsTutorsOffers] = useState(
    userRole !== UserRoleEnum.Tutor
  )

  return (
    <PageWrapper>
      <OffersToggle
        isTutorsOffers={isTutorsOffers}
        setIsTutorsOffers={setIsTutorsOffers}
      />
    </PageWrapper>
  )
}

export default FindOffers
