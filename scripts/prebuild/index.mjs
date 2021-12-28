import del from 'del';

(async () => {
  console.log('[CLEANUP]', 'Start');
  await del(['dist']);
  console.log('[CLEANUP]', 'Completed');
})();
