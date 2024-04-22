import { useTranslation } from 'react-i18next';
import { useClustersConf } from '../../../lib/k8s';
import { Cluster } from '../../../lib/k8s/cluster';
import Pod from '../../../lib/k8s/pod';
import { PageGrid, SectionBox } from '../../common';
import { PodListRenderer } from '../../pod/List';

export default function FluxUI() {
  const clusters = useClustersConf() || {};

  return <FluxUIComponent clusters={clusters} />;
}

interface FluxUIComponentProps {
  clusters: { [name: string]: Cluster };
}

function FluxUIComponent({ clusters }: FluxUIComponentProps) {
  const { t } = useTranslation(['glossary', 'translation']);

  return (
    <PageGrid>
      <SectionBox headerProps={{ headerStyle: 'main' }} title={t('translation|Flux UI')} backLink>
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

function Pods({ cluster }: PodsProps) {
  const [pods, error] = Pod.useList({
    cluster: cluster,
  });

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
