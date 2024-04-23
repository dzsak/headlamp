import { useTranslation } from 'react-i18next';
import { useClustersConf } from '../../../lib/k8s';
import { Cluster } from '../../../lib/k8s/cluster';
import CRD from '../../../lib/k8s/crd';
import { PageGrid, SectionBox } from '../../common';
import Empty from '../../common/EmptyContent';
import { CustomResourceListTable } from '../../crd/CustomResourceList';

export default function FluxUISources() {
  const clusters = useClustersConf() || {};

  return <FluxUISourcesComponent clusters={clusters} />;
}

interface FluxUISourcesComponentProps {
  clusters: { [name: string]: Cluster };
}

function FluxUISourcesComponent(props: FluxUISourcesComponentProps) {
  const { clusters } = props;
  const { t } = useTranslation(['glossary', 'translation']);

  return (
    <PageGrid>
      <SectionBox
        headerProps={{ headerStyle: 'main' }}
        title={t('translation|Flux UI Resources')}
        backLink
      >
        {Object.values(clusters).map((c, idx) => {
          return (
            <SectionBox key={idx} title={t(`translation|${c.name}`)}>
              <Sources cluster={c.name} />
            </SectionBox>
          );
        })}
      </SectionBox>
    </PageGrid>
  );
}

interface SourcesProps {
  cluster?: string;
}

function Sources(props: SourcesProps) {
  const { cluster } = props;
  const { t } = useTranslation(['glossary', 'translation']);
  const [crd, error] = CRD.useGet('gitrepositories.source.toolkit.fluxcd.io');

  console.log(cluster);
  console.log(crd);
  console.log(error);

  if (error) {
    return (
      <Empty color="error">
        {t('translation|{{ errorMessage }}', {
          errorMessage: error,
        })}
      </Empty>
    );
  }

  if (!crd) {
    return <Empty> {t("translation|You don't have any CRDs right now")}</Empty>;
  }

  return <ResourceList crd={crd} />;
}

export interface CustomResourceListProps {
  crd: CRD;
}

function ResourceList(props: CustomResourceListProps) {
  const { crd } = props;

  return (
    <PageGrid>
      <CustomResourceListTable crd={crd} />
    </PageGrid>
  );
}
