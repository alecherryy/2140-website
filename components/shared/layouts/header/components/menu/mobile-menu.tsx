'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { MenuProps } from './menu'
import classNames from 'classnames'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '../../../../button/button'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const menuWrapperVariant: Variants = {
  initial: { height: 0, overflow: 'hidden' },
  animate: {
    height: '100vh',
    transition: {
      duration: 0.75,
      ease: [0.19, 1, 0.22, 1]
    }
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.75,
      ease: [0.19, 1, 0.22, 1],
      delay: 0.5
    }
  }
}

const contentVariant: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
      delay: 0.5
    }
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.19, 1, 0.22, 1]
    }
  }
}

export const MobileMenu = ({
  items,
  donate,
  isMobileMenuOpen,
  onMobileMenuToggle
}: MenuProps) => {
  const pathname = usePathname()

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <AnimatePresence>
      <MenuIcon isOpen={isMobileMenuOpen} handleClick={onMobileMenuToggle} />
      {isMobileMenuOpen && (
        <motion.nav
          key="mobile-menu-wrapper"
          variants={menuWrapperVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex items-center justify-center bg-yellow-200 h-screen w-screen left-0 fixed top-0 z-4"
        >
          <motion.ul
            variants={contentVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center gap-5 list-none m-0 p-3"
          >
            {items.map((item) => {
              return (
                <li
                  key={item._key}
                  className={classNames(
                    'mobile-menu-item',
                    item.href === pathname && 'active'
                  )}
                >
                  <Link
                    className="no-underline flex gap-2 items-center"
                    target={item._type === 'external' ? '_blank' : undefined}
                    href={item.href}
                    onClick={onMobileMenuToggle}
                  >
                    {item.label}
                    {item._type === 'external' && <ExternalLink size={18} />}
                  </Link>
                </li>
              )
            })}
            {donate && (
              <li className="mt-20">
                <Button href={donate} variant="secondary" className="min-w-45">
                  Donate
                </Button>
              </li>
            )}
          </motion.ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

const MenuIcon = ({
  handleClick,
  isOpen
}: {
  handleClick: () => void
  isOpen: boolean
}) => {
  return (
    <div className="relative z-5">
      <button
        className="bg-black rounded-full h-10 w-10 border-none cursor-pointer flex items-center justify-center"
        onClick={handleClick}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <Image
            width="12"
            height="12"
            src="images/menu-close.svg"
            alt="Mobile menu icon"
          />
        ) : (
          <Image
            width="16"
            height="16"
            src="images/menu-open.svg"
            alt="Mobile menu icon"
          />
        )}
      </button>
    </div>
  )
}
