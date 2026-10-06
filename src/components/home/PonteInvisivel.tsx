import Link from 'next/link';
import { lpConfigurar } from '@/lib/links';
import styles from './home.module.css';

export const PonteInvisivel = () => {
  return (
    <section className={`${styles.noite} ${styles.faixa}`} aria-labelledby="manifesto-titulo">
      <div className={styles.miolo}>
        <div className={styles.manifesto}>
          <span className={`${styles.rotulo} ${styles.manifestoRotulo}`}>O que a gente acredita</span>
          <h2 id="manifesto-titulo" className={styles.manifestoTitulo}>
            A tecnologia é a ponte <span className={styles.invisivel}>invisível</span>.
          </h2>
          <p className={styles.manifestoTexto}>
            Ninguém atravessa uma ponte pensando nos cabos. Pensa em quem está do outro lado. É assim que a gente faz tecnologia: você cuida do seu cliente, e a gente cuida do resto.
          </p>
          <Link href="/sobre" className={styles.manifestoLink}>
            Conheça a Unum
          </Link>
        </div>

        <div className={styles.fecho}>
          <div>
            <h2 className={styles.fechoTitulo}>Do outro lado, alguém está procurando o que você faz.</h2>
            <p className={styles.fechoApoio}>Monte a sua página e veja como fica antes de pagar.</p>
          </div>
          <a className={`${styles.botao} ${styles.botaoClaro}`} href={lpConfigurar('institucional')}>
            Montar minha página
            <svg className={styles.seta} viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
