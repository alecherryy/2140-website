'use client'

import { Menu } from 'components/shared/layouts/header/components/menu/menu'
import { Container } from 'components/shared/layouts/container/container'
import debounce from 'lodash/debounce'
import { useEffect, useRef, useState } from 'react'
import { Logo } from './components/logo/logo'
import classNames from 'classnames'
import { SanityImage } from 'types/image'
import { InternalOrExternalLink } from 'types/link'
import { resolveInternalOrExternalLink } from 'utils/link'

interface Props {
  logo: SanityImage
  items: InternalOrExternalLink[]
  donate?: string
}

export const Header = ({ logo, items, donate }: Props) => {
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const [isSticky, setIsSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [hasWindow, setHasWindow] = useState(false)
  const checkScreenSize = () => {
    const isSmallScreen = window.innerWidth < 900
    setIsMobile(isSmallScreen)

    if (!isSmallScreen) {
      setIsMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true)

      checkScreenSize()
      window.addEventListener('resize', checkScreenSize)
      return () => window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  const handleScroll = debounce(() => {
    const div = ref?.current
    const scrollY = window.scrollY

    if (div) {
      if (scrollY < 80) {
        div.style.position = 'absolute'
        div.style.transform = 'none'
        div.style.transition = 'none'
        div.style.boxShadow = 'none'
        div.style.background = 'transparent'
        setIsSticky(false)
      }
      // set isSticky to true if the user has scrolled more than 80px
      if (scrollY >= 80 && !isSticky) {
        const height = div.getBoundingClientRect().height
        if (window.scrollY > height) {
          div.style.position = 'fixed'
          div.style.transform = 'translateY(-100%)'
          div.style.background = '#fff'

          setTimeout(() => {
            div.style.transition = 'all 0.4s cubic-bezier(0.83, 0, 0.17, 1)'
          }, 100)

          setTimeout(() => {
            div.style.transform = 'translateY(0)'
            div.style.boxShadow = '0 0 40px rgba(0, 0, 0, 0.1)'
          }, 300)

          setIsSticky(true)
        }
      }
    }
  }, 100)

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }

    return
  }, [handleScroll, hasWindow])

  return (
    <header
      ref={ref}
      className="text-black absolute w-full z-99 overflow-x-hidden"
    >
      <Container
        size="lg"
        className="flex items-center h-20 justify-between relative yellow-backdrop"
      >
        <Logo
          image={logo}
          onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
        />
        <Menu
          isMobile={isMobile}
          items={items.map((item) => resolveInternalOrExternalLink(item))}
          donate={donate}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => {
            setIsMobileMenuOpen((state: boolean) => {
              const newState = !state
              document.documentElement.classList.toggle(
                'overflow-hidden',
                newState
              )
              return newState
            })
          }}
        />
      </Container>
    </header>
  )
}
