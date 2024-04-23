import { useTranslation } from 'react-i18next';
import { ApiError } from '../../../lib/k8s/apiProxy';
import CRD from '../../../lib/k8s/crd';
import Pod from '../../../lib/k8s/pod';
import { PageGrid, SectionBox } from '../../common';
import Empty from '../../common/EmptyContent';
import { CustomResourceListTable } from '../../crd/CustomResourceList';
import { PodListRenderer } from '../../pod/List';

export default function FluxUIClusterItems() {
  const { t } = useTranslation(['glossary', 'translation']);
  const [crd, crdError] = CRD.useGet('gitrepositories.source.toolkit.fluxcd.io');
  const [pods, podError] = Pod.useList();

  return (
    <PageGrid>
      <SectionBox
        headerProps={{ headerStyle: 'main' }}
        title={t('translation|Flux UI in Cluster Items')}
        backLink
      >
        <span>Hello from Gimlet Team in Cluster Items!</span>
      </SectionBox>
      <GitRepositories gitRepositories={crd} error={crdError} />
      <Pods pods={pods} error={podError} />
    </PageGrid>
  );
}

interface PodsProps {
  pods: any[];
  error: ApiError | null;
}

function Pods(props: PodsProps) {
  const { pods, error } = props;
  const { t } = useTranslation(['glossary', 'translation']);

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

interface GitRepositoriesProps {
  gitRepositories: CRD;
  error: ApiError | null;
}

function GitRepositories(props: GitRepositoriesProps) {
  const { gitRepositories, error } = props;
  const { t } = useTranslation(['glossary', 'translation']);

  if (error || !gitRepositories) {
    return (
      <Empty color="error">
        {t('translation|{{ errorMessage }}', {
          errorMessage: error,
        })}
      </Empty>
    );
  }

  return <CustomResourceListTable title={t('glossary|GitRepositories')} crd={gitRepositories} />;
}
