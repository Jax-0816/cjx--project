import { useCallback, useEffect, useState } from 'react';
import type { Combo } from '@/data/pdd/combos';
import { readUserCombos, USER_COMBOS_CHANGED_EVENT } from '@/data/pdd/userComboStorage';

export function useUserCombos(): Combo[] {
  const [combos, setCombos] = useState<Combo[]>(() => readUserCombos());

  const refresh = useCallback(() => {
    setCombos(readUserCombos());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(USER_COMBOS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(USER_COMBOS_CHANGED_EVENT, refresh);
  }, [refresh]);

  return combos;
}
