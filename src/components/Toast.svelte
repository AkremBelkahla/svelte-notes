<script>
  export let message = '';
</script>

<div class="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in-up">
  <div class="flex items-center">
    <div class="mr-3 text-green-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <p class="font-medium">{message}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">Votre note a été créée avec succès.</p>
    </div>
  </div>
</div>

<style>
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out forwards;
  }
</style>
