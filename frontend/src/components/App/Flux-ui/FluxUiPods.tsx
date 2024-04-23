import { useTranslation } from 'react-i18next';
import { useClustersConf } from '../../../lib/k8s';
import { Cluster } from '../../../lib/k8s/cluster';
import Pod from '../../../lib/k8s/pod';
import { PageGrid, SectionBox } from '../../common';
import Empty from '../../common/EmptyContent';
import { PodListRenderer } from '../../pod/List';

export default function FluxUIPods() {
  const clusters = useClustersConf() || {};

  return <FluxUIPodsComponent clusters={clusters} />;
}

interface FluxUIPodsComponentProps {
  clusters: { [name: string]: Cluster };
}

function FluxUIPodsComponent(props: FluxUIPodsComponentProps) {
  const { clusters } = props;
  const { t } = useTranslation(['glossary', 'translation']);

  return (
    <PageGrid>
      <SectionBox
        headerProps={{ headerStyle: 'main' }}
        title={t('translation|Flux UI Pods')}
        backLink
      >
        {Object.values(clusters).map((c, idx) => {
          return (
            <SectionBox key={idx} title={t(`translation|${c.name}`)}>
              <Pods cluster={c.name} />
            </SectionBox>
          );
        })}
      </SectionBox>
    </PageGrid>
  );
}

interface PodsProps {
  cluster?: string;
}

function Pods(props: PodsProps) {
  const { cluster } = props;
  const { t } = useTranslation(['glossary', 'translation']);
  const [pods, error] = Pod.useList({
    cluster: cluster,
  });

  if (error) {
    return (
      <Empty color="error">
        {t('translation|{{ errorMessage }}', {
          errorMessage: error,
        })}
      </Empty>
    );
  }

  return (
    <PodListRenderer
      hideColumns={['namespace']}
      pods={pods}
      error={error}
      noNamespaceFilter
      noSearch
    />
  );
}
