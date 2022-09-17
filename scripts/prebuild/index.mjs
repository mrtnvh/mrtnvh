import { deleteAsync } from 'del';

(async () => {
  console.log('[CLEANUP]', 'Start');
  await deleteAsync(['dist']);
  console.log('[CLEANUP]', 'Completed');
})();
