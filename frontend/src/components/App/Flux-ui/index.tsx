import { useTranslation } from 'react-i18next';
import { PageGrid, SectionBox } from '../../common';

export default function FluxUI() {
  const { t } = useTranslation(['glossary', 'translation']);

  return (
    <PageGrid>
      <SectionBox headerProps={{ headerStyle: 'main' }} title={t('translation|Flux UI')} backLink>
        <span>Hello from Gimlet Team!</span>
      </SectionBox>
    </PageGrid>
  );
}
