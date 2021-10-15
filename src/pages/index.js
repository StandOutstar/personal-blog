import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Python',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Automation
        Test Automation
        Backend Service Develop
      </>
    ),
  },
  {
    title: '.NET',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Backend Service Develop
      </>
    ),
  },
  {
    title: 'Go',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Single File Command Tool
        Backend Service Develop
      </>
    ),
  },
  {
    title: 'JavaScript',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Frontend Develop
      </>
    ),
  }
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--3', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const domains = [
  {
    title: 'Software Test',
    imageUrl: 'img/bug_search.svg',
    description: (
      <>
      
      </>
    ),
  },
  {
    title: 'Software Development',
    imageUrl: 'img/programming.svg',
    description: (
      <>
      
      </>
    ),
  },
  {
    title: 'Software DevOps',
    imageUrl: 'img/devops.svg',
    description: (
      <>
      
      </>
    ),
  },
  {
    title: 'Automation',
    imageUrl: 'img/automation.svg',
    description: (
      <>
      
      </>
    ),
  },
];

function Domain({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--3', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {domains && domains.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {domains.map((props, idx) => (
                  <Domain key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}

        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
