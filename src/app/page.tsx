import { ComoFunciona } from '@/components/home/ComoFunciona';
import { Hero } from '@/components/home/Hero';
import { OVao } from '@/components/home/OVao';
import { PonteInvisivel } from '@/components/home/PonteInvisivel';
import styles from '@/components/home/home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <Hero />
      <OVao />
      <ComoFunciona />
      <PonteInvisivel />
    </div>
  );
}
