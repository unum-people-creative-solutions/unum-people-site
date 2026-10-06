import { lpPlanos } from '@/lib/links';
import styles from './home.module.css';

const VAOS = [
  {
    rotulo: 'Ser encontrado',
    dor: 'O cliente procura você no Google e só acha um perfil de Instagram.',
    plano: 'Página',
    texto: 'Um endereço seu na internet, com botão de WhatsApp. Para ter onde mandar o cliente além do Instagram.',
  },
  {
    rotulo: 'Ser lembrado pelo que sabe',
    dor: 'Você explica bem o seu trabalho, mas o post some do feed em dois dias.',
    plano: 'Presença',
    texto: 'A página com blog no mesmo endereço. Cada texto vira mais uma porta para quem procura o assunto no Google.',
  },
  {
    rotulo: 'Não perder quem chega',
    dor: 'O contato chega e se perde entre as conversas do WhatsApp.',
    plano: 'Captação',
    texto: 'Formulário na página e CRM no celular, que avisa quando chega contato. Cada pessoa fica guardada até virar cliente.',
  },
] as const;

export const OVao = () => {
  return (
    <section className={`${styles.vao} ${styles.faixa}`} aria-labelledby="vao-titulo">
      <div className={styles.miolo}>
        <div className={styles.cabeca}>
          <span className={`${styles.rotulo} ${styles.cabecaRotulo}`}>O vão</span>
          <h2 id="vao-titulo" className={styles.cabecaTitulo}>
            Entre você e o cliente sempre existe uma distância.
          </h2>
          <p className={styles.cabecaApoio}>
            Na engenharia, vão é o trecho que a ponte precisa vencer. No seu negócio, ele costuma aparecer em um destes três lugares.
          </p>
        </div>

        {/* Gradiente único compartilhado pelos três arcos */}
        <svg width={0} height={0} aria-hidden="true">
          <defs>
            <linearGradient id="vao-arco" x1="0" x2="1">
              <stop offset="0" stopColor="#0A1C82" />
              <stop offset=".5" stopColor="#6B00D7" />
              <stop offset="1" stopColor="#FF3D00" />
            </linearGradient>
          </defs>
        </svg>

        <ol className={styles.vaos}>
          {VAOS.map((item) => (
            <li key={item.plano} className={styles.vaosItem}>
              <p className={styles.vaosDor}>
                <small className={styles.vaosDorRotulo}>{item.rotulo}</small>
                {item.dor}
              </p>
              <svg className={styles.vaosArco} viewBox="0 0 160 48" aria-hidden="true">
                <path d="M4 40 Q80 -6 156 40" fill="none" stroke="url(#vao-arco)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M4 40H156" stroke="#DDE0EF" strokeWidth="1.5" />
              </svg>
              <div className={styles.vaosPlano}>
                <h3 className={styles.vaosPlanoTitulo}>{item.plano}</h3>
                <p className={styles.vaosPlanoTexto}>{item.texto}</p>
                <a className={styles.vaosPlanoLink} href={lpPlanos()}>
                  {`Ver o plano ${item.plano}`}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
