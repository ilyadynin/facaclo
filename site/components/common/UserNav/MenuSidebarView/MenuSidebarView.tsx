import Link from 'next/link'
import s from './MenuSidebarView.module.css'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import type { Link as LinkProps } from './index'

export default function MenuSidebarView({
  links = [],
}: {
  links?: LinkProps[]
}) {
  const { closeSidebar } = useUI()

  return (
    <SidebarLayout handleClose={() => closeSidebar()}>
      <div className={s.root}>
        <nav>
          <ul>
            <li className={s.item} onClick={() => closeSidebar()}></li>
            <Link href="/">
              <a>Home</a>
            </Link>
            {links.map((l: any) => (
              <li
                key={l.href}
                className={s.item}
                onClick={() => closeSidebar()}
              >
                <Link href={l.href}>
                  <a>{l.label}</a>
                </Link>
              </li>
            ))}
            <li className={s.item}>
              <Link href="/contact">
                <a>Kontakt</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </SidebarLayout>
  )
}

MenuSidebarView
