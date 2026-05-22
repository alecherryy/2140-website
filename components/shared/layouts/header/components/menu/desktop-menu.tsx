import Link from 'next/link'
import { MenuProps } from './menu'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { ExternalLink } from 'lucide-react'

export const DesktopMenu = ({
  items
}: Omit<MenuProps, 'isMobileMenuOpen' | 'onMobileMenuToggle'>) => {
  const pathname = usePathname()

  return (
    <nav className="flex justify-end">
      <ul className="flex gap-10 list-none">
        {items.map((item) => {
          const isExternalLink = item._type === 'external'
          return (
            <li
              key={item._key}
              className={classNames(
                'mb-0 p-0 relative whitespace-nowrap menu-item',
                item.href === pathname && 'active',
                isExternalLink && 'flex items-center justify-end mr-5'
              )}
            >
              <Link
                className="no-underline"
                target={item._type === 'external' ? '_blank' : undefined}
                href={item.href}
              >
                {item.label}
              </Link>
              {item._type === 'external' && (
                <div className="h-4 left-[calc(100%+0.25rem)] absolute w-4">
                  <ExternalLink size={16} />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
