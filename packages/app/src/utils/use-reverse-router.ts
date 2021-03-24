import { useMemo } from 'react';
import { useBreakpoints } from './useBreakpoints';

export function useReverseRouter() {
  const breakpoints = useBreakpoints();
  const openMenuSuffix = !breakpoints.md ? '?menu=1' : '';

  return useMemo(() => {
    // prettier-ignore
    const reverseRouter =  {
      actueel: {
        vr: (code: string) => `/actueel/veiligheidsregio/${code}`,
        gm: (code: string) => `/actueel/gemeente/${code}`
      },

      gm: {
        index: (code: string) =>  reverseRouter.gm.positiefGetesteMensen(code) + openMenuSuffix,
        positiefGetesteMensen: (code: string) => `/gemeente/${code}/positief-geteste-mensen`,
        sterfte: (code: string) => `/gemeente/${code}/sterfte`,
        ziekenhuisopnames: (code: string) => `/gemeente/${code}/ziekenhuis-opnames`,
        rioolwater: (code: string) => `/gemeente/${code}/rioolwater`,
      },

      vr: {
        index: (code: string) =>  reverseRouter.vr.risiconiveau(code) + openMenuSuffix,
        maatregelen: (code: string) => `/veiligheidsregio/${code}/maatregelen`,
        risiconiveau: (code: string) => `/veiligheidsregio/${code}/risiconiveau`,
        positiefGetesteMensen: (code: string) => `/veiligheidsregio/${code}/positief-geteste-mensen`,
        sterfte: (code: string) => `/veiligheidsregio/${code}/sterfte`,
        ziekenhuisopnames: (code: string) => `/veiligheidsregio/${code}/ziekenhuis-opnames`,
        verpleeghuiszorg: (code: string) => `/veiligheidsregio/${code}/verpleeghuiszorg`,
        gehandicaptenzorg: (code: string) => `/veiligheidsregio/${code}/gehandicaptenzorg`,
        thuiswonendeOuderen: (code: string) => `/veiligheidsregio/${code}/thuiswonende-ouderen`,
        rioolwater: (code: string) => `/veiligheidsregio/${code}/rioolwater`,
        gedrag: (code: string) => `/veiligheidsregio/${code}/gedrag`,
      }
    } as const

    return reverseRouter;
  }, [openMenuSuffix]);
}
