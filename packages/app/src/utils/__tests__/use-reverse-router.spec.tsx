import { cleanup, render } from '@testing-library/react';
import {
  cleanup as cleanupHooks,
  renderHook,
} from '@testing-library/react-hooks';
import injectJsDom from 'jsdom-global';
import * as sinon from 'sinon';
import { ThemeProvider } from 'styled-components';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import theme from '~/style/theme';
import { BreakpointContextProvider } from '../use-breakpoints';
import { useReverseRouter } from '../use-reverse-router';

const UseReverseRouter = suite('useReverseRouter');

let largeScreen = false;

UseReverseRouter.before((context) => {
  context.cleanupJsDom = injectJsDom();
  (window as any).matchMedia = () => {};
  sinon.stub(window, 'matchMedia').callsFake((mq: string) => {
    switch (mq) {
      case 'screen and (min-width: 60em)': {
        return {
          matches: largeScreen,
          addListener: (callback: any) => {},
        } as MediaQueryList;
      }
      default:
        return {
          matches: false,
          addListener: (callback: any) => {},
        } as MediaQueryList;
    }
  });
});

UseReverseRouter.after((context) => {
  context.cleanupJsDom();
  sinon.restore();
});

UseReverseRouter.after.each(() => {
  cleanup();
  cleanupHooks();
});

UseReverseRouter.before.each((context) => {});

const TestContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <BreakpointContextProvider>
        <TestBed />
      </BreakpointContextProvider>
    </ThemeProvider>
  );
};

const TestBed = () => {
  const router = useReverseRouter();

  return (
    <>
      <div data-testid="nl">{router.nl.index()}</div>
      <div data-testid="vr">{router.vr.index('VR25')}</div>
      <div data-testid="gm">{router.gm.index('GM001')}</div>
      <div data-testid="in">{router.in.index()}</div>
    </>
  );
};

UseReverseRouter(
  'indexes should have menu suffix on small pages',
  (context) => {
    largeScreen = false;
    const result = render(<TestContainer />);
    const nlDiv = result.getByTestId('nl');
    const vrDiv = result.getByTestId('vr');
    const gmDiv = result.getByTestId('gm');
    const inDiv = result.getByTestId('in');

    assert.equal(nlDiv.textContent?.endsWith('?menu=1'), true);
    assert.equal(vrDiv.textContent?.endsWith('?menu=1'), true);
    assert.equal(gmDiv.textContent?.endsWith('?menu=1'), true);
    assert.equal(inDiv.textContent?.endsWith('?menu=1'), true);
  }
);

UseReverseRouter(
  'indexes should not have menu suffix on large pages',
  (context) => {
    largeScreen = true;
    const result = render(<TestContainer />);
    const nlDiv = result.getByTestId('nl');
    const vrDiv = result.getByTestId('vr');
    const gmDiv = result.getByTestId('gm');
    const inDiv = result.getByTestId('in');

    assert.equal(nlDiv.textContent?.endsWith('?menu=1'), false);
    assert.equal(vrDiv.textContent?.endsWith('?menu=1'), false);
    assert.equal(gmDiv.textContent?.endsWith('?menu=1'), false);
    assert.equal(inDiv.textContent?.endsWith('?menu=1'), false);
  }
);

UseReverseRouter('VR routes should have the VR code in them', (context) => {
  const { result } = renderHook(() => useReverseRouter());

  const keys = Object.keys(result.current.vr);
  keys.forEach((name) => {
    const route = (result.current.vr as any)[name]('VR25');
    assert.equal(route.indexOf('VR25') > -1, true);
  });

  const route = result.current.actueel.vr('VR25');
  assert.equal(route.indexOf('VR25') > -1, true);
});

UseReverseRouter('GM routes should have the GM code in them', (context) => {
  const { result } = renderHook(() => useReverseRouter());

  const keys = Object.keys(result.current.gm);
  keys.forEach((name) => {
    const route = (result.current.gm as any)[name]('GM001');
    assert.equal(route.indexOf('GM001') > -1, true);
  });

  const route = result.current.actueel.gm('GM001');
  assert.equal(route.indexOf('GM001') > -1, true);
});

UseReverseRouter.run();