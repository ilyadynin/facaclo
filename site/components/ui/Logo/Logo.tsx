import NextImage from 'next/image'
import Image from './image.jpg'

const Logo = ({ className = '', ...props }) => (
  <NextImage src={Image} width={50} height={50} />
)

export default Logo
