import { lpConfigurar } from '@/lib/links';
import styles from './home.module.css';

const PASSOS = [
  {
    n: 1,
    titulo: 'Escolha o modelo',
    texto: 'Dez modelos, cada um pensado para um tipo de negócio, do chaveiro ao consultório.',
  },
  {
    n: 2,
    titulo: 'Escreva do seu jeito',
    texto: 'Troque textos, fotos e cores. Você vê a página mudar enquanto escreve.',
  },
  {
    n: 3,
    titulo: 'Publique e receba',
    texto: 'Pague só quando decidir publicar. O botão de WhatsApp já sai funcionando.',
  },
] as const;

export const ComoFunciona = () => {
  return (
    <section className={`${styles.como} ${styles.faixa}`} aria-labelledby="como-titulo">
      <div className={styles.miolo}>
        <div className={styles.cabeca}>
          <span className={`${styles.rotulo} ${styles.cabecaRotulo}`}>Como funciona</span>
          <h2 id="como-titulo" className={styles.cabecaTitulo}>
            Do modelo ao primeiro contato.
          </h2>
        </div>
        <ol className={styles.passos}>
          {PASSOS.map((passo) => (
            <li key={passo.titulo} className={styles.passo}>
              <span className={styles.passoNumero} aria-hidden="true">{passo.n}</span>
              <h3 className={styles.passoTitulo}>{passo.titulo}</h3>
              <p className={styles.passoTexto}>{passo.texto}</p>
            </li>
          ))}
        </ol>
        <div className={styles.comoAcao}>
          <a className={`${styles.botao} ${styles.botaoEscuro}`} href={lpConfigurar('institucional')}>
            Montar minha página
          </a>
          <span className={styles.comoApoio}>Você vê como fica antes de pagar.</span>
        </div>
      </div>
    </section>
  );
};
