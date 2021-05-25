import css from '@styled-system/css';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '~/assets/close-thin.svg';
import ExpandIcon from '~/assets/expand.svg';
import { Tile } from '~/components/tile';
import { useIntl } from '~/intl';
import { replaceVariablesInText } from '~/utils/replace-variables-in-text';
import { useBreakpoints } from '~/utils/use-breakpoints';
import { usePrevious } from '~/utils/use-previous';
import { Spacer } from './base';
import { IconButton } from './icon-button';
import { Metadata, MetadataProps } from './metadata';
import { Modal } from './modal';

export function FullscreenChartTile({
  children,
  metadata,
}: {
  children: React.ReactNode;
  metadata?: MetadataProps;
}) {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wasFullscreen = usePrevious(isFullscreen);
  const breakpoints = useBreakpoints();
  const intl = useIntl();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (wasFullscreen && !isFullscreen) {
      buttonRef.current?.focus();
    }
  }, [wasFullscreen, isFullscreen]);

  const label = replaceVariablesInText(
    isFullscreen
      ? intl.siteText.common.modal_close
      : intl.siteText.common.modal_open,
    { subject: intl.siteText.common.grafiek_singular }
  );

  const tile = (
    <Tile height="100%">
      {children}

      {metadata && (
        <>
          <Spacer m="auto" />
          <Metadata {...metadata} isTileFooter />
        </>
      )}

      {breakpoints.md && (
        <div
          css={css({
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: isFullscreen || isButtonVisible ? 'silver' : 'white',
            '&:focus-within, &:hover': { color: 'gray' },
          })}
        >
          <IconButton
            ref={isFullscreen ? undefined : buttonRef}
            title={label}
            onClick={() => setIsFullscreen((x) => !x)}
            size={36}
          >
            {isFullscreen ? <CloseIcon /> : <ExpandIcon />}
          </IconButton>
        </div>
      )}
    </Tile>
  );

  return (
    <>
      <div
        onPointerEnter={() => setIsButtonVisible(true)}
        onPointerLeave={() => setIsButtonVisible(false)}
      >
        {tile}
      </div>

      {breakpoints.md && isFullscreen && (
        <Modal
          id="chart-tile-container"
          onClose={() => setIsFullscreen(false)}
          isFullheight
        >
          {tile}
        </Modal>
      )}
    </>
  );
}