<template>
  <div class="flex space-x-3 w-full md:w-auto justify-center">
    <div class="flex space-x-2">
      <span
        class="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center"
        aria-hidden="true"
      >
        <span class="h-2 w-2 bg-green-400 rounded-full"></span>
      </span>

      <h2 class="text-sm font-medium">
        <p>
          <span class=" inset-0" aria-hidden="true"></span>
          Vacant
        </p>
      </h2>
    </div>
    <div class="flex space-x-2">
      <span
        class="h-4 w-4 bg-red-100 rounded-full flex items-center justify-center"
        aria-hidden="true"
      >
        <span class="h-2 w-2 bg-red-400 rounded-full"></span>
      </span>

      <h2 class="text-sm font-medium">
        <p>
          <span class=" inset-0" aria-hidden="true"></span>
          Occupied
        </p>
      </h2>
    </div>
    <div class="flex space-x-2">
      <span
        class="h-4 w-4 bg-red-100 rounded-full flex items-center justify-center"
        aria-hidden="true"
      >
        <span class="h-2 w-2 bg-yellow-400 rounded-full"></span>
      </span>

      <h2 class="text-sm font-medium">
        <p>
          <span class=" inset-0" aria-hidden="true"></span>
          Low Power
        </p>
      </h2>
    </div>
    <div class="flex space-x-2">
      <span
        class="h-4 w-4 bg-gray-200 rounded-full flex items-center justify-center"
        aria-hidden="true"
      >
        <span class="h-2 w-2 bg-gray-500 rounded-full"></span>
      </span>

      <h2 class="text-sm font-medium">
        <p>
          <span class=" inset-0" aria-hidden="true"></span>
          Unavailable
        </p>
      </h2>
    </div>
  </div>
</template>
