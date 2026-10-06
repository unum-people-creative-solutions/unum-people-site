import { lpConfigurar, lpPlanos } from '@/lib/links';
import styles from './home.module.css';

export const Hero = () => {
  return (
    <section className={`${styles.hero} ${styles.faixa}`} aria-labelledby="hero-titulo">
      <div className={`${styles.miolo} ${styles.heroMiolo}`}>
        <div className={styles.heroTexto}>
          <span className={`${styles.heroRotulo} ${styles.rotulo}`}>
            Páginas com WhatsApp para profissionais e pequenos negócios
          </span>
          <h1 id="hero-titulo" className={styles.heroTitulo}>
            <span className={styles.linha}>Seu cliente está</span>
            {' '}
            <span className={styles.linha}>do outro lado.</span>
            {' '}
            <span className={`${styles.linha} ${styles.acende}`}>Sua página é a ponte.</span>
          </h1>
          <p className={styles.heroApoio}>
            Monte em minutos, com o modelo do seu tipo de negócio e o botão de WhatsApp pronto. Você vê como fica antes de pagar.
          </p>
          <div className={styles.heroAcoes}>
            <a className={`${styles.botao} ${styles.botaoClaro}`} href={lpConfigurar('institucional')}>
              Montar minha página
              <svg className={styles.seta} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className={`${styles.botao} ${styles.botaoLinha}`} href={lpPlanos()}>
              Ver planos
            </a>
          </div>
        </div>
      </div>

      {/* A ponte é só visual: o h1 já diz o que ela significa */}
      <div className={styles.ponte} aria-hidden="true">
        <div data-ponte className={`${styles.traco} ${styles.base}`} />
        <div className={styles.varredura}>
          <div className={styles.brilho}>
            <div data-ponte className={styles.traco} />
          </div>
          <div data-ponte className={styles.traco} />
        </div>
      </div>

      {/* Aviso decorativo que chega com a luz; não deve ser lido em voz alta */}
      <div className={styles.contato} aria-hidden="true">
        <div className={styles.contatoIcone}>
          <svg viewBox="0 0 24 24" fill="#fff">
            <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 16.4a7.4 7.4 0 0 1-3.8-1l-.3-.2-2.7.7.7-2.6-.2-.3A7.4 7.4 0 1 1 12 19.4Zm4-5.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6 6 0 0 1-3-2.6c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.5 2.5 0 0 0-.8 1.9 4.4 4.4 0 0 0 .9 2.3 10 10 0 0 0 3.8 3.4c1.4.6 2 .6 2.7.5.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.4-.3Z" />
          </svg>
        </div>
        <div>
          <div className={styles.contatoQuem}>
            <span>Novo contato pela sua página</span>
            <span>agora</span>
          </div>
          <div className={styles.contatoMsg}>Oi! Achei sua página no Google. Você atende no sábado?</div>
        </div>
      </div>
    </section>
  );
};
