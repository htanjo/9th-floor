import { useMemo } from 'react';
import logoColoredImage from '../assets/logo.webp';
import logoFlatImage from '../assets/logo_flat.webp';
import classes from './Logo.module.scss';

interface LogoProps {
  colored?: boolean;
}

function Logo({ colored = true }: LogoProps) {
  const imageUrl = useMemo(
    () => (colored ? logoColoredImage : logoFlatImage),
    [colored],
  );

  return <img src={imageUrl} alt="The 9th Floor" className={classes.logo} />;
}

export default Logo;
