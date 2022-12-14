import cn from 'clsx'
import { inherits } from 'util'
import s from './ProductTag.module.css'
import { useRouter } from 'next/router'

interface ProductTagProps {
  className?: string
  name: string
  price?: string
  fontSize?: number
}

const ProductTag: React.FC<ProductTagProps> = ({
  name,
  price,
  className = '',
  fontSize = 32,
}) => {
  const router = useRouter()

  return (
    <div className={cn(s.root, className)}>
      <h3 className={s.name}>
        <span
          className={cn({ [s.fontsizing]: fontSize < 32 })}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize}px`,
          }}
        >
          {name}
        </span>
      </h3>
      {router.pathname != '/' && <div className={s.price}>{price}</div>}
    </div>
  )
}

export default ProductTag
